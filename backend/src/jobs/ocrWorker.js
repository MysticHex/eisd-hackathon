const { ocrQueue } = require('../shared/queue');
const ocrRepository = require('../modules/ocr/repositories/ocr.repository');
const logger = require('../shared/utils/logger');
const config = require('../config');

// Mock Adapter Logic
const mockOcrProcess = async (fileKey) => {
  // In a real scenario, download file from s3Adapter and send to OCR API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        rawText: "INVOICE #1001 Total: $500.00 Date: 2023-10-27",
        parsedData: {
          invoice_number: "1001",
          total_amount: 500.00,
          date: "2023-10-27",
          vendor: "ACME Corp"
        },
        confidences: {
          invoice_number: 0.99,
          total_amount: 0.95
        }
      });
    }, 2000); // Simulate delay
  });
};

// Job Processor
ocrQueue.process(async (job) => {
  const { documentId, fileKey } = job.data;
  logger.info(`Processing OCR job for doc ${documentId}`);

  try {
    let result;
    if (config.flags.mockOcr) {
      result = await mockOcrProcess(fileKey);
    } else {
      // Call real adapter here
      throw new Error("Real OCR adapter not implemented yet");
    }

    await ocrRepository.updateStatusAndResult(
      documentId,
      'processed',
      result.rawText,
      result.parsedData,
      result.confidences
    );
    
    logger.info(`OCR job completed for doc ${documentId}`);
  } catch (error) {
    logger.error(`OCR job failed for doc ${documentId}:`, error);
    await ocrRepository.updateStatusAndResult(documentId, 'failed', null, null, null);
    throw error; // Retry logic handled by Bull
  }
});

logger.info('OCR Worker started');