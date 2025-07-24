const { Order, OrderItem, Product } = require('../models');

const OrderController = {
    async create(req, res) {
        try {
            const { user_id, items, note } = req.body;
            const total_price = items.reduce((sum, item) => sum + item.unit_price * item.quantity, 0);

            const order = await Order.create({ user_id, total_price, note });
            for (const item of items) {
                await OrderItem.create({ order_id: order.id, ...item });
            }

            return res.status(201).json({ message: 'Tạo đơn hàng thành công', order_id: order.id });
        } catch (err) {
            return res.status(500).json({ message: 'Lỗi tạo đơn hàng' });
        }
    },

    async getAll(req, res) {
        try {
            const orders = await Order.findAll({ include: [OrderItem] });
            return res.json(orders);
        } catch (err) {
            return res.status(500).json({ message: 'Lỗi lấy đơn hàng' });
        }
    }
};

module.exports = OrderController;
