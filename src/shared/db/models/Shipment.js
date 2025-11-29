const { DataTypes } = require('sequelize');
const sequelize = require('../index');

const Shipment = sequelize.define('Shipment', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  batch_no: { type: DataTypes.STRING, allowNull: false },
  supplier_name: { type: DataTypes.STRING },
  status: { type: DataTypes.ENUM('MATCHED', 'MISMATCH', 'PENDING'), defaultValue: 'PENDING' },
  items_json: { type: DataTypes.TEXT('long') }
}, { tableName: 'shipments', underscored: true });

module.exports = Shipment;