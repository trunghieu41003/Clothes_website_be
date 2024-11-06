const { User } = require('../models/index'); // Import model User
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserController = {
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

      const { userId, name, email, password, newPassword, sendemail } = req.body;

      // Find user by ID
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ message: 'Người dùng không tồn tại.' });
      }
      if(sendemail == "true"){
        user.password = await bcrypt.hash(newPassword, 10);
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
