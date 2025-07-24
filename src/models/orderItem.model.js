const sequel = require('sequelize');
const mySequel = require('../config/database');

const OrderItem = mySequel.define('order_items', {
    id: { type: sequel.INTEGER, primaryKey: true, autoIncrement: true },
    order_id: { type: sequel.INTEGER },
    product_id: { type: sequel.INTEGER },
    quantity: { type: sequel.INTEGER, allowNull: false },
    unit_price: { type: sequel.DECIMAL(12, 2), allowNull: false },
}, {
    underscored: false,
    timestamps: false,
    paranoid: true,
    freezeTableName: true,
    tableName: 'order_items',
});

module.exports = OrderItem;
