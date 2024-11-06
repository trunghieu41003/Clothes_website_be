// config/database.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('fitnessdb', 'root', 'Trunghieu2003', {
  host: '127.0.0.1',  // hoặc 'localhost'
  dialect: 'mysql',   // có thể là 'mysql', 'postgres', 'sqlite', hoặc 'mssql'
});

module.exports = sequelize;
