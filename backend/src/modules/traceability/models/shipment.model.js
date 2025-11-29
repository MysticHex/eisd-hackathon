const { DataTypes } = require('sequelize');
const sequelize = require('../../../shared/db');

const Shipment = sequelize.define('Shipment', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  batch_no: { type: DataTypes.STRING, allowNull: false },
  supplier_name: { type: DataTypes.STRING },
  status: { type: DataTypes.ENUM('MATCHED', 'MISMATCH', 'PENDING'), defaultValue: 'PENDING' },
  items_json: { type: DataTypes.JSON }}, { tableName: 'shipments', underscored: true });

module.exports = Shipment;
