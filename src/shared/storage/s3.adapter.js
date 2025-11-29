const Minio = require('minio');
const config = require('../../config');
const logger = require('../utils/logger');

const minioClient = new Minio.Client({
  endPoint: config.minio.endPoint,
  port: config.minio.port,
  useSSL: config.minio.useSSL,
  accessKey: config.minio.accessKey,
  secretKey: config.minio.secretKey
});

// Ensure bucket exists on startup
const initBucket = async () => {
  try {
    const exists = await minioClient.bucketExists(config.minio.bucket);
    if (!exists) {
      await minioClient.makeBucket(config.minio.bucket, 'us-east-1');
      logger.info(`Bucket ${config.minio.bucket} created.`);
    }
  } catch (err) {
    logger.error('Error checking/creating bucket:', err);
  }
};

// Call init if not in test env
if (process.env.NODE_ENV !== 'test') initBucket();

module.exports = {
  uploadFile: async (fileBuffer, fileName, mimeType) => {
    return new Promise((resolve, reject) => {
      minioClient.putObject(config.minio.bucket, fileName, fileBuffer, null, { 'Content-Type': mimeType }, (err, etag) => {
        if (err) return reject(err);
        resolve(etag);
      });
    });
  },
  
  getFileStream: async (fileName) => {
    return minioClient.getObject(config.minio.bucket, fileName);
  },

  getPresignedUrl: async (fileName) => {
      return minioClient.presignedGetObject(config.minio.bucket, fileName, 24*60*60);
  }
};