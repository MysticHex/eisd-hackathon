const ocrRepository = require('../repositories/ocr.repository');
const s3Adapter = require('../../../shared/storage/s3.adapter');
const { ocrQueue } = require('../../../shared/queue');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

class OcrService {
  async uploadDocument(file, userId) {
    const fileExtension = path.extname(file.originalname);
    const fileKey = `${uuidv4()}${fileExtension}`;

    // 1. Upload to MinIO
    await s3Adapter.uploadFile(file.buffer, fileKey, file.mimetype);

    // 2. Create DB Record
    const doc = await ocrRepository.create({
      file_key: fileKey,
      uploader_id: userId, // from auth middleware
      status: 'pending'
    });

    // 3. Enqueue Job
    await ocrQueue.add({
      documentId: doc.id,
      fileKey: fileKey
    });

    return doc;
  }

  async getDocument(id) {
    const doc = await ocrRepository.findById(id);
    if (!doc) throw new Error('Document not found');
    
    // Add presigned URL for viewing the original file
    const url = await s3Adapter.getPresignedUrl(doc.file_key);
    
    return { ...doc.toJSON(), url };
  }
}

module.exports = new OcrService();