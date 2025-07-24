const { Post } = require('../models');

const PostController = {
    async getAll(req, res) {
        try {
            const posts = await Post.findAll({ order: [['created_at', 'DESC']] });
            return res.json(posts);
        } catch (err) {
            return res.status(500).json({ message: 'Lỗi lấy bài viết' });
        }
    },

    async create(req, res) {
        try {
            const post = await Post.create(req.body);
            return res.status(201).json({ message: 'Đã đăng bài viết', post });
        } catch (err) {
            return res.status(500).json({ message: 'Lỗi đăng bài viết' });
        }
    },

    async update(req, res) {
        try {
            const { id } = req.params;
            const updated = await Post.update(req.body, { where: { id } });
            if (updated[0] === 0) {
                return res.status(404).json({ message: 'Không tìm thấy bài viết để cập nhật.' });
            }
            return res.json({ message: 'Cập nhật bài viết thành công.' });
        } catch (err) {
            return res.status(500).json({ message: 'Lỗi cập nhật bài viết.' });
        }
    },

    async delete(req, res) {
        try {
            const { id } = req.params;
            const deleted = await Post.destroy({ where: { id } });
            if (!deleted) {
                return res.status(404).json({ message: 'Không tìm thấy bài viết để xóa.' });
            }
            return res.json({ message: 'Đã xóa bài viết.' });
        } catch (err) {
            return res.status(500).json({ message: 'Lỗi xóa bài viết.' });
        }
    }
};

module.exports = PostController;
