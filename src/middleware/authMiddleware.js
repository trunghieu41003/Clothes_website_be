const jwt = require('jsonwebtoken');

const secretKey = 'your_secret_key'; // Đảm bảo bạn dùng cùng key khi tạo token

// Middleware xác thực token
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization token is required.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, secretKey);

    // Gán thông tin người dùng vào request
    if (req.method === 'GET') {
      req.query.userId = decoded.userId;
    } else {
      req.body.userId = decoded.userId;
    }

    req.user = decoded; // Lưu thông tin đầy đủ user từ token
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token.' });
  }
};

// Middleware kiểm tra quyền admin
const isAdminMiddleware = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    return res.status(403).json({ message: 'Bạn không có quyền truy cập (admin only).' });
  }
};

module.exports = {
  authMiddleware,
  isAdminMiddleware,
};
