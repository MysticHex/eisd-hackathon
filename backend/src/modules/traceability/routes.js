const express = require('express');
const router = express.Router();
const Shipment = require('./models/shipment.model');

// GET /api/v1/trace
router.get('/', async (req, res) => {
  try {
    let { page, limit } = req.query;

    // Normalize and validate pagination params
    page = parseInt(page, 10) || 1;
    limit = parseInt(limit, 10) || 10;

    if (page < 1) {
      return res.status(400).json({ message: "Page must be greater than or equal to 1" });
    }
    if (limit < 1 || limit > 100) {
      return res.status(400).json({ message: "Limit must be between 1 and 100" });
    }

    const offset = (page - 1) * limit;

    const { count, rows } = await Shipment.findAndCountAll({
      offset,
      limit,
      order: [['createdAt', 'DESC']]
    });

    res.json({
      data: rows,
      meta: {
        totalItems: count,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        itemsPerPage: limit
      }
    });
  } catch (error) {
    console.error('Error fetching shipments:', error);
    res.status(500).json({ message: 'An error occurred while fetching shipments' });
  }
});

// POST /api/v1/trace
router.post('/', async (req, res) => {
  try {
    const { batch_no, supplier_name, status, items_json } = req.body;

    // Basic Validation
    if (!batch_no || typeof batch_no !== 'string') {
      return res.status(400).json({ message: 'batch_no is required and must be a string' });
    }
    if (supplier_name !== undefined && typeof supplier_name !== 'string') {
      return res.status(400).json({ message: 'supplier_name must be a string' });
    }
    // Whitelist allowed fields
    const payload = {
      batch_no,
      supplier_name,
      status: ['MATCHED', 'MISMATCH', 'PENDING'].includes(status) ? status : 'PENDING',
      items_json
    };

    const shipment = await Shipment.create(payload);
    res.status(201).json(shipment);
  } catch (error) {
    console.error('Error creating shipment:', error);
    // Distinguish validation errors from server errors
    const statusCode = error.name === 'SequelizeValidationError' ? 400 : 500;
    const message = statusCode === 400 ? 'Invalid shipment data' : 'An error occurred while creating shipment';
    res.status(statusCode).json({ message });  }
});

module.exports = router;