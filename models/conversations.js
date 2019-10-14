/* jshint indent: 2 */
var connection = require('./DBConnection.js');
var DataTypes = require('sequelize');

var ConversationsModel = connection.define('Conversations', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    ReceiverID: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    }
  }, {
    tableName: 'Conversations',
    timestamps: false
  });

  module.exports = ConversationsModel;
