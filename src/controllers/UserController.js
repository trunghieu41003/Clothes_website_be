const { User } = require('../models/index'); // Import model User
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const secretKey = 'your_secret_key'; // Đảm bảo bạn sử dụng cùng một secret key
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: '21522624@gm.uit.edu.vn',
    pass: 'nood utzt tukf sbxb', // Bạn cần tạo mật khẩu ứng dụng nếu dùng Gmail
  },
});
const UserController = {
  // Forgot Password
  async forgotPassword(req, res) {
    try {
      const { email } = req.body;
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res.status(404).json({ message: 'Email không tồn tại.' });
      }

      // Tạo token reset password
      const token = jwt.sign({ userId: user.user_id, email: user.email }, secretKey, { expiresIn: '1h' });
      const resetLink = `http://localhost:3001/reset-password?token=${token}`;

      // Gửi email
      await transporter.sendMail({
        from: 'your_email@gmail.com',
        to: user.email,
        subject: 'Đặt lại mật khẩu',
        html: `<p>Bấm vào liên kết sau để đặt lại mật khẩu của bạn:</p><a href="${resetLink}">${resetLink}</a>`,
      });

      return res.status(200).json({ message: 'Email đặt lại mật khẩu đã được gửi.' });
    } catch (error) {
      console.error('Error in forgotPassword:', error.message);
      return res.status(500).json({ message: 'Lỗi khi gửi email đặt lại mật khẩu.', error: error.message });
    }
  },

  // Reset Password
  async resetPassword(req, res) {
    try {
      const { token, newPassword } = req.body;
      if (!token || !newPassword) {
        return res.status(400).json({ message: 'Token và mật khẩu mới là bắt buộc.' });
      }

      // Xác thực token
      const decoded = jwt.verify(token, secretKey);
      if (!decoded || !decoded.userId) {
        return res.status(400).json({ message: 'Token không hợp lệ hoặc đã hết hạn.' });
      }

      const user = await User.findByPk(decoded.userId);
      if (!user) {
        return res.status(404).json({ message: 'Người dùng không tồn tại.' });
      }

      // Hash mật khẩu mới và lưu
      user.password = await bcrypt.hash(newPassword, 10);
      await user.save();

      return res.status(200).json({ message: 'Mật khẩu đã được đặt lại thành công.' });
    } catch (error) {
      console.error('Error in resetPassword:', error.message);
      return res.status(500).json({ message: 'Lỗi khi đặt lại mật khẩu.', error: error.message });
    }
  },

  // Register a new user
  async register(req, res) {
    try {
      const { name, email, password, weight } = req.body;

      // Check if the email already exists
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: 'Email đã được sử dụng.' });
      }

      // Hash the password before saving
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user
      const newUser = await User.create({ name, email, password: hashedPassword, weight });

      // Return the new user without the password
      return res.status(201).json({
        message: 'Người dùng đã được tạo thành công.',
        user: { id: newUser.user_id, name: newUser.name, email: newUser.email, weight: newUser.weight },
      });
    } catch (error) {
      console.error('Error in creating user:', error);
      return res.status(500).json({ message: 'Lỗi khi tạo người dùng.' });
    }
  },

  // Login function
  async login(req, res) {
    try {
      const { email, password } = req.body;

      // Find user by email
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(400).json({ message: 'Email hoặc mật khẩu không đúng.' });
      }

      // Check if the password is correct
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Email hoặc mật khẩu không đúng.' });
      }

      // Generate JWT token
      const token = jwt.sign({ userId: user.user_id, name: user.name, email: user.email }, 'your_secret_key', {
        expiresIn: '10h', // Token expires in 10 hour
      });

      // Return the token
      return res.status(200).json({ message: 'Đăng nhập thành công.', token });
    } catch (error) {
      console.error('Error in user login:', error);
      return res.status(500).json({ message: 'Lỗi khi đăng nhập.' });
    }
  },
  // Update user information
  async update(req, res) {
    try {

      const { userId, name, email, password, newPassword } = req.body;

      // Find user by ID
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ message: 'Người dùng không tồn tại.' });
      }
      // Check if password is being updated
      if (newPassword) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(400).json({ message: 'Mật khẩu cũ không đúng.' });
        }
        // Hash the new password before saving
        user.password = await bcrypt.hash(newPassword, 10);
      }
      // Update other fields if provided
      if (name) user.name = name;
      if (email) user.email = email;

      // Save the updated user
      await user.save();

      // Return the updated user without the password
      return res.status(200).json({
        message: 'Thông tin người dùng đã được cập nhật.',
        user: { id: user.user_id, name: user.name, email: user.email },
      });
    } catch (error) {
      console.error('Error in updating user:', error);
      return res.status(500).json({ message: 'Lỗi khi cập nhật thông tin người dùng.' });
    }
  },
  async getUserinfo(req, res) {
    const { userId } = req.query; // Get userId and date from request body

    try {
      const users = await User.findByPk(userId);
      return res.json(users);
    } catch (error) {
      console.error('Error in getUser:', error);
      return res.status(500).json({ message: 'Error retrieving users.', error });
    }
  },
};

module.exports = UserController;
