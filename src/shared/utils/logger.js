const pino = require('pino');

const logger = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true
    }
  },
  level: process.env.NODE_ENV === 'test' ? 'silent' : 'info'
});

module.exports = logger;