const sequel = require('sequelize');
const mySequel = require('../config/database');

const Category = mySequel.define('categories', {
    id: { type: sequel.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: sequel.STRING(100), allowNull: false },
}, {
    underscored: false,
    timestamps: false,
    paranoid: true,
    freezeTableName: true,
    tableName: 'categories',
});

module.exports = Category;
