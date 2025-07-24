const sequel = require('sequelize');
const mySequel = require('../config/database');

const Order = mySequel.define('orders', {
    id: { type: sequel.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: { type: sequel.INTEGER },
    status: { type: sequel.ENUM('pending', 'confirmed', 'shipped', 'completed'), defaultValue: 'pending' },
    total_price: { type: sequel.DECIMAL(12, 2), allowNull: false },
    note: { type: sequel.TEXT },
    created_at: { type: sequel.DATE, defaultValue: sequel.NOW },
}, {
    underscored: false,
    timestamps: false,
    paranoid: true,
    freezeTableName: true,
    tableName: 'orders',
});

module.exports = Order;
