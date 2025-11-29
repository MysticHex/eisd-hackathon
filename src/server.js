const app = require('./app');
const config = require('./config');
const logger = require('./shared/utils/logger');
const sequelize = require('./shared/db');

// Import Workers to start listening
require('./jobs/ocrWorker');

const startServer = async () => {
  try {
    if (!process.env.JWT_SECRET) {
      logger.error('FATAL: JWT_SECRET is not defined in environment variables.');
      process.exit(1);
    }

    // Ensure DB connection
    await sequelize.authenticate();
    logger.info('Database connection established.');

    app.listen(config.port, () => {
      logger.info(`Server running on port ${config.port}`);
      logger.info(`Environment: ${process.env.NODE_ENV}`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();