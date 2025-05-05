const sequel = require('sequelize');
const mySequel = require('../config/database');
const User = require('./user');

const Diary = mySequel.define('diary', {
  diary_id: {
    type: sequel.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  user_id: {
    type: sequel.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'user_id',
    },
    onDelete: 'CASCADE',
  },
  date: {
    type: sequel.DATE,
    allowNull: false,
  },
  total_time: {
    type: sequel.INTEGER,
    allowNull: true,
  },
  exercise_completion: {
    type: sequel.INTEGER,
    allowNull: true,
  },
  total_calories_burned: {
    type: sequel.DECIMAL(5, 2),
    allowNull: true,
  },
  time_completion: {
    type: sequel.INTEGER,
    allowNull: true,
  },
  total_exercise: {
    type: sequel.INTEGER,
    allowNull: true,
  },
}, {
  underscored: false,
  timestamps: false,
  paranoid: true,
  freezeTableName: true,
  tableName: 'diary',
});

module.exports = Diary;
