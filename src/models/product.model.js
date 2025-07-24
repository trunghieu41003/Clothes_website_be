const sequel = require('sequelize');
const mySequel = require('../config/database');

const Product = mySequel.define('products', {
    id: { type: sequel.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: sequel.STRING(150), allowNull: false },
    description: { type: sequel.TEXT },
    price: { type: sequel.DECIMAL(12, 2), allowNull: false },
    quantity_stock: { type: sequel.INTEGER, defaultValue: 0 },
    image_url: { type: sequel.STRING(255) },
    category_id: { type: sequel.INTEGER },
    created_at: { type: sequel.DATE, defaultValue: sequel.NOW },
}, {
    underscored: false,
    timestamps: false,
    paranoid: true,
    freezeTableName: true,
    tableName: 'products',
});

module.exports = Product;
