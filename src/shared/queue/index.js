const Queue = require('bull');
const config = require('../../config');
const logger = require('../utils/logger');

const ocrQueue = new Queue('ocr-queue', {
  redis: {
    host: config.redis.host,
    port: config.redis.port
  }
});

ocrQueue.on('error', (error) => {
  logger.error('Queue error:', error);
});

module.exports = {
  ocrQueue
};