const express = require('express');
const router = express.Router();
const Shipment = require('./models/shipment.model');

// GET /api/v1/trace
router.get('/', async (req, res) => {
  try {
    const shipments = await Shipment.findAll();
    res.json(shipments);
  } catch (error) {
    console.error('Error fetching shipments:', error);
    res.status(500).json({ message: 'An error occurred while fetching shipments' });  }
});

// POST /api/v1/trace
router.post('/', async (req, res) => {
  try {
    const shipment = await Shipment.create(req.body);
    res.status(201).json(shipment);
  } catch (error) {
    console.error('Error creating shipment:', error);
    // Distinguish validation errors from server errors
    const statusCode = error.name === 'SequelizeValidationError' ? 400 : 500;
    const message = statusCode === 400 ? 'Invalid shipment data' : 'An error occurred while creating shipment';
    res.status(statusCode).json({ message });  }
});

module.exports = router;