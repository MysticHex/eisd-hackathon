const sequelize = require('./index');
// Import models to ensure they are registered
require('./models/OcrDocument');
// require('./models/User'); // Add other models here
const logger = require('../utils/logger');

const syncDb = async () => {
  try {
    await sequelize.authenticate();
    logger.info('Database connected.');
    // { alter: true } updates columns without dropping data (good for dev)
    await sequelize.sync({ alter: true });
    logger.info('Database synchronized.');
    process.exit(0);
  } catch (error) {
    logger.error('Unable to sync database:', error);
    process.exit(1);
  }
};

syncDb();