// config/database.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE, process.env.USER_DB, process.env.PASSWORD_DB, {
  host: process.env.HOST_NAME_DB,  // hoặc 'localhost'
  dialect: 'mysql',   // có thể là 'mysql', 'postgres', 'sqlite', hoặc 'mssql'
});

module.exports = sequelize;
