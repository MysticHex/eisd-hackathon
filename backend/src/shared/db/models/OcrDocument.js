const { DataTypes } = require('sequelize');
const sequelize = require('../index');

const OcrDocument = sequelize.define('OcrDocument', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  file_key: {
    type: DataTypes.STRING,
    allowNull: false
  },
  uploader_id: {
    type: DataTypes.UUID,
    allowNull: true // Nullable for demo simplicity if auth skipped
  },
  status: {
    type: DataTypes.ENUM('pending', 'processed', 'verified', 'failed'),
    defaultValue: 'pending'
  },
  raw_ocr_text: {
    type: DataTypes.TEXT('long'),
    allowNull: true
  },
  parsed_json: {
    type: DataTypes.TEXT('long'), // Storing JSON as string for MySQL flexibility
    allowNull: true,
    get() {
        const rawValue = this.getDataValue('parsed_json');
        return rawValue ? JSON.parse(rawValue) : null;
    },
    set(value) {
        this.setDataValue('parsed_json', JSON.stringify(value));
    }
  },
  confidences_json: {
    type: DataTypes.TEXT('long'),
    allowNull: true
  }
}, {
  tableName: 'ocr_documents',
  timestamps: true,
  underscored: true
});

module.exports = OcrDocument;