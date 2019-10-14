/* jshint indent: 2 */
var connection = require('./DBConnection.js');
var DataTypes = require('sequelize');

var MessagesModel = connection.define('Messages', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    Author: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    body: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    tableName: 'Messages',
    timestamps: false
  });

  module.exports = MessagesModel;
