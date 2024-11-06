const sequel = require('sequelize');
const mySequel = require('../config/database');

const Exercise = mySequel.define('exercise', {
  exercise_id: {
    type: sequel.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: sequel.STRING(50),
    allowNull: false,
  },
  met: {
    type: sequel.DECIMAL(5, 2),
    allowNull: true,
  },

}, {
  underscored: false,
  timestamps: false,
  paranoid: true,
  freezeTableName: true,
  tableName: 'exercise',
});

module.exports = Exercise;
