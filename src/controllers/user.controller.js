const { User } = require('../models');
const bcrypt = require('bcryptjs');

const UserController = {
    async register(req, res) {
        try {
            const { name, email, password, role } = req.body;
            const existing = await User.findOne({ where: { email } });
            if (existing) return res.status(400).json({ message: 'Email đã tồn tại' });

            const hashed = await bcrypt.hash(password, 10);
            const user = await User.create({ name, email, password: hashed, role });
            return res.status(201).json({ message: 'Đăng ký thành công', user });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Lỗi đăng ký' });
        }
    },

    async getProfile(req, res) {
        try {
            const { id } = req.params;
            const user = await User.findByPk(id);
            if (!user) return res.status(404).json({ message: 'Không tìm thấy người dùng' });
            return res.json(user);
        } catch (err) {
            return res.status(500).json({ message: 'Lỗi server' });
        }
    }
};

module.exports = UserController;
