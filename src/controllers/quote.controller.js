const { Quote } = require('../models');

const QuoteController = {
    async create(req, res) {
        try {
            const quote = await Quote.create(req.body);
            return res.status(201).json({ message: 'Yêu cầu báo giá đã được gửi', quote });
        } catch (err) {
            return res.status(500).json({ message: 'Lỗi gửi yêu cầu báo giá' });
        }
    },

    async getAll(req, res) {
        try {
            const quotes = await Quote.findAll();
            return res.json(quotes);
        } catch (err) {
            return res.status(500).json({ message: 'Lỗi lấy yêu cầu báo giá' });
        }
    }
};

module.exports = QuoteController;
