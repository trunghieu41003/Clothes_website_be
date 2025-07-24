const User = require('./user.model');
const Product = require('./product.model');
const Category = require('./category.model');
const Order = require('./order.model');
const OrderItem = require('./orderItem.model');
const Quote = require('./quote.model');
const Post = require('./post.model');

// Associations
User.hasMany(Order, { foreignKey: 'user_id' });
Order.belongsTo(User, { foreignKey: 'user_id' });

Category.hasMany(Product, { foreignKey: 'category_id' });
Product.belongsTo(Category, { foreignKey: 'category_id' });

Order.hasMany(OrderItem, { foreignKey: 'order_id' });
OrderItem.belongsTo(Order, { foreignKey: 'order_id' });

Product.hasMany(OrderItem, { foreignKey: 'product_id' });
OrderItem.belongsTo(Product, { foreignKey: 'product_id' });

module.exports = {
    User,
    Product,
    Category,
    Order,
    OrderItem,
    Quote,
    Post,
};
