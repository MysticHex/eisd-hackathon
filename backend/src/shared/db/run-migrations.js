const { Sequelize } = require('sequelize');
const path = require('path');
const fs = require('fs');
const sequelize = require('../index'); // Import existing sequelize instance
const logger = require('../../utils/logger');

const MIGRATION_TIMEOUT = parseInt(process.env.MIGRATION_TIMEOUT_MS) || 30000; // 30s default for ops
const STATEMENT_TIMEOUT = parseInt(process.env.DB_STATEMENT_TIMEOUT_MS) || 300000; // 5m default for queries

// Helper to wrap promises with timeout
const withTimeout = (promise, ms, opName) => {
  let timeoutId;
  const timeoutPromise = new Promise((_, reject) => {
    timeoutId = setTimeout(() => {
      reject(new Error(`Operation '${opName}' timed out after ${ms}ms`));
    }, ms);
  });

  return Promise.race([promise, timeoutPromise]).finally(() => clearTimeout(timeoutId));
};

const runMigrations = async () => {
  try {
    // Update dialect options for statement timeout
    if (sequelize.options.dialect === 'mysql') {
        sequelize.options.dialectOptions = {
            ...sequelize.options.dialectOptions,
            statement_timeout: STATEMENT_TIMEOUT
        };
    }

    await withTimeout(sequelize.authenticate(), MIGRATION_TIMEOUT, 'Database Authentication');
    logger.info('Database connected for migrations.');

    const queryInterface = sequelize.getQueryInterface();
    const migrationsDir = path.join(__dirname, 'migrations');
    
    // Get list of migration files
    const files = fs.readdirSync(migrationsDir).filter(f => f.endsWith('.js')).sort();

    // Create SequelizeMeta table if not exists
    await withTimeout(sequelize.query(`
      CREATE TABLE IF NOT EXISTS SequelizeMeta (
        name VARCHAR(255) NOT NULL,
        PRIMARY KEY (name)
      )
    `), MIGRATION_TIMEOUT, 'Create Meta Table');

    const [executedMigrations] = await withTimeout(
        sequelize.query('SELECT name FROM SequelizeMeta'),
        MIGRATION_TIMEOUT,
        'Fetch Executed Migrations'
    );
    const executedNames = executedMigrations.map(m => m.name);

    for (const file of files) {
      if (!executedNames.includes(file)) {
        logger.info(`Running migration: ${file}`);
        const migration = require(path.join(migrationsDir, file));
        
        await withTimeout(
            sequelize.transaction(async (transaction) => {
                await migration.up(queryInterface, Sequelize);
                await sequelize.query('INSERT INTO SequelizeMeta (name) VALUES (?)', {
                    replacements: [file],
                    transaction
                });
            }),
            MIGRATION_TIMEOUT * 10, // Give migrations more time
            `Migration: ${file}`
        );
        
        logger.info(`Completed migration: ${file}`);
      } else {
        logger.info(`Skipping executed migration: ${file}`);
      }
    }

    logger.info('All migrations executed successfully.');
    await sequelize.close();
    process.exit(0);
  } catch (error) {
    logger.error('Migration failed:', error);
    await sequelize.close().catch(() => {});
    process.exit(1);
  }
};

runMigrations();
