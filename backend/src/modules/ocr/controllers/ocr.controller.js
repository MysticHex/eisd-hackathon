const ocrService = require('../services/ocr.service');
const logger = require('../../../shared/utils/logger');

exports.upload = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    // Mock user ID (replace with req.user.id in real auth)
    const userId = req.user ? req.user.id : null;
    
    const result = await ocrService.uploadDocument(req.file, userId);
    res.status(201).json({ message: 'Upload successful, processing started', data: result });
  } catch (error) {
    next(error);
  }
};

exports.getDocument = async (req, res, next) => {
  try {
    const result = await ocrService.getDocument(req.params.id);
    res.json({ data: result });
  } catch (error) {
    next(error);
  }
};