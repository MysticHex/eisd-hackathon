const OcrDocument = require('../../../shared/db/models/OcrDocument');

class OcrRepository {
  async create(data) {
    return await OcrDocument.create(data);
  }

  async findById(id) {
    return await OcrDocument.findByPk(id);
  }

  async updateStatusAndResult(id, status, rawText, parsedJson, confidences) {
    return await OcrDocument.update({
      status,
      raw_ocr_text: rawText,
      parsed_json: parsedJson, // Setter will stringify
      confidences_json: JSON.stringify(confidences)
    }, {
      where: { id }
    });
  }
}

module.exports = new OcrRepository();