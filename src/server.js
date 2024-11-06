const express = require('express')
const sequelize = require('./config/database'); // Import kết nối đến MySQL
const userRoutes = require('./routes/userRoutes'); // Import routes cho người dùng
const diaryRoutes = require('./routes/diaryRoutes');
const exerciseRoutes = require('./routes/exerciseRoutes');
const authMiddleware = require('./middleware/authMiddleware');
const app = express()

app.use(express.json());
// Sử dụng routes cho người dùng
app.use('/api/users', userRoutes); // Tất cả các route liên quan đến người dùng sẽ bắt đầu với /users
// Other routes
app.use('/api/diaries', authMiddleware, diaryRoutes);
app.use('/api/exercises', authMiddleware, exerciseRoutes);
// Test kết nối với cơ sở dữ liệu
// sequelize.authenticate()
//   .then(() => {
//     console.log('Kết nối tới MySQL thành công!');
//   })
//   .catch(err => {
//     console.error('Không thể kết nối tới MySQL:', err);
//   });
app.listen(3000)