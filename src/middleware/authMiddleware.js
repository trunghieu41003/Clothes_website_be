const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  // Split the header to get the token
  const token = authHeader.split(' ')[1]; // This gets the token part after "Bearer"
  if (!token) {
    return res.status(401).json({ message: 'Authorization token is required.' });
  }

  try {
    const decoded = jwt.verify(token, 'your_secret_key');
    if (req.method === 'GET') {
      req.query.userId = decoded.userId; // Store userId in query for GET requests
    } else {
      req.body.userId = decoded.userId; // Store userId in body for other requests
    }
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token.' });
  }
};

module.exports = authMiddleware;
