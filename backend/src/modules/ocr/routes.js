const express = require('express');
const multer = require('multer');
const router = express.Router();
const ocrController = require('./controllers/ocr.controller');

const upload = multer({ storage: multer.memoryStorage() });

router.post('/upload', upload.single('file'), ocrController.upload);
router.get('/documents/:id', ocrController.getDocument);

module.exports = router;