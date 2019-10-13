/* jshint indent: 2 */
var connection = require('./DBConnection.js');
var DataTypes = require('sequelize');
const UserModel = require('./Users');

var DepartmentModel = connection.define('Departments', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    Name: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    tableName: 'Departments',
    timestamps: false
  });

  DepartmentModel.associate = function() {

    DepartmentModel.hasMany(UserModel,{foreignKey: 'DepartmentID',as: 'DepartmentEmployees', targetkey:'id'});
    
 }

  module.exports = DepartmentModel;
