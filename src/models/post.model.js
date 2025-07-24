const sequel = require('sequelize');
const mySequel = require('../config/database');

const Post = mySequel.define('posts', {
    id: { type: sequel.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: sequel.STRING(200), allowNull: false },
    content: { type: sequel.TEXT, allowNull: false },
    thumbnail: { type: sequel.STRING(255) },
    created_at: { type: sequel.DATE, defaultValue: sequel.NOW },
}, {
    underscored: false,
    timestamps: false,
    paranoid: true,
    freezeTableName: true,
    tableName: 'posts',
});

module.exports = Post;
