const { OrderItem } = require('../models');

const OrderItemController = {
    async getByOrderId(req, res) {
        try {
            const { orderId } = req.params;
            const items = await OrderItem.findAll({ where: { order_id: orderId } });
            return res.json(items);
        } catch (err) {
            return res.status(500).json({ message: 'Lỗi lấy chi tiết đơn hàng' });
        }
    }
};

module.exports = OrderItemController;
