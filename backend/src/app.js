const express = require('express');
const cors = require('cors');
// const pinoHttp = require('pino-http'); // pino-http is not installed
const logger = require('./shared/utils/logger');
const ocrRoutes = require('./modules/ocr/routes');
const ticsRoutes = require('./modules/tics/routes');
const traceRoutes = require('./modules/traceability/routes');

// Initialize App
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(pinoHttp({ logger }));

// Routes
app.use('/api/v1/ocr', ocrRoutes);
app.use('/api/v1/tics', ticsRoutes);
app.use('/api/v1/trace', traceRoutes);

// Health Check
app.get('/health', (req, res) => res.status(200).json({ status: 'ok' }));

// 404 Handler
app.use((req, res, next) => {
  res.status(404).json({ message: 'Not Found' });
});

// Global Error Handler
app.use((err, req, res, next) => {
  logger.error(err);
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';
  res.status(status).json({
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
});

module.exports = app;