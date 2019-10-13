/* jshint indent: 2 */
var connection = require('./DBConnection.js');
var DataTypes = require('sequelize');
var BenefitsModel = connection.define('Benefits', {
  id: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  Title: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  Description: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  tableName: 'Benefits',
  timestamps: false
});

module.exports = BenefitsModel;

