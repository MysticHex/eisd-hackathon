const express = require('express');
const router = express.Router();
const ticsController = require('./controllers/tics.controller');

router.post('/ingest', ticsController.ingestEvents);
router.get('/summary', ticsController.getSummary);

module.exports = router;
