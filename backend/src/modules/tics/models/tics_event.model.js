const { DataTypes } = require('sequelize');
const sequelize = require('../../../shared/db');

const TicsEvent = sequelize.define('TicsEvent', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  station_id: { type: DataTypes.STRING, allowNull: false }, // e.g., "STATION-01"
  unit_id: { type: DataTypes.STRING, allowNull: false }, // e.g., Product Serial
  event_type: { type: DataTypes.ENUM('START', 'STOP', 'ERROR'), allowNull: false },
  timestamp: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  metadata: { type: DataTypes.TEXT('long') } // JSON payload
}, { tableName: 'tics_events', underscored: true });

module.exports = TicsEvent;
