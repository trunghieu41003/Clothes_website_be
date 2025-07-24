const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const secretKey = 'your_secret_key';

const AuthController = {
    async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ where: { email } });

            if (!user) return res.status(404).json({ message: 'Tài khoản không tồn tại.' });

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(400).json({ message: 'Mật khẩu không chính xác.' });

            const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, secretKey, { expiresIn: '10h' });
            return res.json({ message: 'Đăng nhập thành công', token });
        } catch (err) {
            console.error('Auth error:', err.message);
            return res.status(500).json({ message: 'Đăng nhập thất bại.' });
        }
    }
};

module.exports = AuthController;
