const { Category } = require('../models');

const CategoryController = {
    async getAll(req, res) {
        try {
            const categories = await Category.findAll();
            return res.json(categories);
        } catch (err) {
            return res.status(500).json({ message: 'Lỗi lấy danh mục' });
        }
    },

    async create(req, res) {
        try {
            const category = await Category.create(req.body);
            return res.status(201).json(category);
        } catch (err) {
            return res.status(500).json({ message: 'Lỗi tạo danh mục' });
        }
    }
};

module.exports = CategoryController;
