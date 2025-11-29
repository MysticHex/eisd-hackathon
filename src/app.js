const express = require('express');
const cors = require('cors');
const pinoHttp = require('pino-http');
const logger = require('./shared/utils/logger');
const ocrRoutes = require('./modules/ocr/routes');

// Initialize App
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(pinoHttp({ logger }));

// Health Check
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// Routes
app.use('/api/v1/ocr', ocrRoutes);
// app.use('/api/v1/tics', ticsRoutes);
// app.use('/api/v1/trace', traceRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  logger.error(err);
  const status = err.status || 500;
  res.status(status).json({
    code: status === 500 ? 'INTERNAL_SERVER_ERROR' : 'ERROR',
    message: err.message,
    details: process.env.NODE_ENV === 'development' ? err.stack : null
  });
});

module.exports = app;