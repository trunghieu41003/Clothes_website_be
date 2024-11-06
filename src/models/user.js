const sequel = require('sequelize');
const mySequel = require('../config/database');

const User = mySequel.define('user', {
  user_id: {
    type: sequel.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: sequel.STRING(50),
    allowNull: false,
  },
  email: {
    type: sequel.STRING(50),
    allowNull: false,
    unique: true,
  },
  password: {
    type: sequel.STRING(50),
    allowNull: false,
  },
}, {
  underscored: false,
  timestamps: false,
  paranoid: true,
  freezeTableName: true,
  tableName: 'user',
});

module.exports = User;
