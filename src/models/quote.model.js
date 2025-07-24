const sequel = require('sequelize');
const mySequel = require('../config/database');

const Quote = mySequel.define('quotes', {
    id: { type: sequel.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: sequel.STRING(100), allowNull: false },
    company: { type: sequel.STRING(150) },
    email: { type: sequel.STRING(100) },
    phone: { type: sequel.STRING(20) },
    product_ids: { type: sequel.TEXT }, // JSON string of product IDs
    message: { type: sequel.TEXT },
    created_at: { type: sequel.DATE, defaultValue: sequel.NOW },
}, {
    underscored: false,
    timestamps: false,
    paranoid: true,
    freezeTableName: true,
    tableName: 'quotes',
});

module.exports = Quote;
