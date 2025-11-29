const { DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      // Check if JSON is supported (MySQL 5.7.8+)
      const dialect = queryInterface.sequelize.getDialect();
      if (dialect === 'mysql') {
        const [versionResult] = await queryInterface.sequelize.query('SELECT VERSION() as version', { transaction });
        const version = versionResult[0].version;
        // Simple check, assuming standard version string. 
        // If MariaDB or older MySQL, this might need adjustment, but standard MySQL 5.7+ is safe.
        // For hackathon context, we assume modern environment or skip if strictly needed.
        // But let's proceed with the safe column swap pattern which works even if JSON type is just an alias (like in some older mariadb versions it was TEXT).
      }

      // 1. Add temporary column
      await queryInterface.addColumn('shipments', 'items_json_new', {
        type: DataTypes.JSON,
        allowNull: true
      }, { transaction });

      // 2. Migrate and Validate Data
      const [rows] = await queryInterface.sequelize.query("SELECT id, items_json FROM shipments", { transaction });
      
      for (const row of rows) {
        let validJson = null;
        if (row.items_json) {
          try {
            // Try to parse the existing TEXT data
            // If it's already an object (unlikely for TEXT column return), use it.
            // If string, parse it.
            const content = typeof row.items_json === 'string' ? JSON.parse(row.items_json) : row.items_json;
            validJson = JSON.stringify(content);
          } catch (e) {
            console.warn(`[Migration] Invalid JSON in shipment ${row.id}, setting to NULL.`);
            validJson = null;
          }
        }

        if (validJson !== null) {
          await queryInterface.sequelize.query(
            "UPDATE shipments SET items_json_new = :json WHERE id = :id",
            {
              replacements: { json: validJson, id: row.id },
              transaction
            }
          );
        }
      }

      // 3. Remove old column
      await queryInterface.removeColumn('shipments', 'items_json', { transaction });

      // 4. Rename new column to old name
      await queryInterface.renameColumn('shipments', 'items_json_new', 'items_json', { transaction });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      console.error('Migration failed:', error);
      throw error;
    }
  },

  down: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      // Revert to TEXT
      // We can use changeColumn here as JSON -> TEXT is generally safe (stringification)
      // But to be symmetric and safe, let's use the same swap pattern or just changeColumn if supported.
      // changeColumn is easier for down migration.
      
      // Note: changeColumn syntax varies by dialect. For MySQL it works.
      await queryInterface.changeColumn('shipments', 'items_json', {
        type: DataTypes.TEXT('long'),
        allowNull: true
      }, { transaction });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
};
