/* jshint indent: 2 */
var connection = require('./DBConnection.js');
var DataTypes = require('sequelize');
const bcrypt = require('bcrypt')
const DepartmenModel = require('./Departments');

var UserModel = connection.define('Users', {
  id: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  Name: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  Email: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  Password: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  ManagerID: {
    type: DataTypes.INTEGER(11),
    allowNull: false
  },
  DepartmentID: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
    references: {
      model: 'Departments',
      key: 'id'
    }
  },
  IsAdmin: {
    type: DataTypes.INTEGER(1),
    allowNull: false,
    defaultValue: '0'
  },
  Phone: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  Address: {
    type: DataTypes.STRING(255),
    allowNull: false
  }
}, {
  tableName: 'Users',
  timestamps: false
});

UserModel.beforeCreate(async (user, options) => {
  try {
    const hash = await bcrypt.hash(user.Password, 10);
    user.Password = hash;
  } catch (error) {
    throw error
  }
});

UserModel.prototype.isValidPassword = async function (Password) {
  try {
    const user = this;
    const compare = await bcrypt.compare(Password, user.Password);
    return compare;
  } catch (error) {
    throw error
  }
}

UserModel.associate = function() {
      
  UserModel.belongsTo(DepartmenModel,{foreignKey: 'DepartmentID',as: 'DepartmentEmployees',sourcekey:'id'});

}

module.exports = UserModel;

