const sequel = require('sequelize');
const mySequel = require('../config/database');

const User = mySequel.define('users', {
    id: { type: sequel.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: sequel.STRING(100), allowNull: false },
    email: { type: sequel.STRING(100), allowNull: false, unique: true },
    password: { type: sequel.STRING(255), allowNull: false },
    role: { type: sequel.ENUM('admin', 'staff', 'partner', 'customer'), defaultValue: 'customer' },
    is_active: { type: sequel.BOOLEAN, defaultValue: true },
    created_at: { type: sequel.DATE, defaultValue: sequel.NOW },
}, {
    underscored: false,
    timestamps: false,
    paranoid: true,
    freezeTableName: true,
    tableName: 'users',
});

module.exports = User;
