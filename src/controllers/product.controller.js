const { Product, Category } = require('../models');

const ProductController = {
    async getAll(req, res) {
        try {
            const products = await Product.findAll({ include: [Category] });
            return res.json(products);
        } catch (err) {
            return res.status(500).json({ message: 'Lỗi lấy sản phẩm' });
        }
    },

    async create(req, res) {
        try {
            const product = await Product.create(req.body);
            return res.status(201).json(product);
        } catch (err) {
            return res.status(500).json({ message: 'Lỗi tạo sản phẩm' });
        }
    },

    async update(req, res) {
        try {
            const { id } = req.params;
            await Product.update(req.body, { where: { id } });
            return res.json({ message: 'Cập nhật thành công' });
        } catch (err) {
            return res.status(500).json({ message: 'Lỗi cập nhật' });
        }
    },

    async delete(req, res) {
        try {
            const { id } = req.params;
            await Product.destroy({ where: { id } });
            return res.json({ message: 'Xoá thành công' });
        } catch (err) {
            return res.status(500).json({ message: 'Lỗi xoá sản phẩm' });
        }
    }
};

module.exports = ProductController;
