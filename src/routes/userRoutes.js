const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const authMiddleware = require('../middleware/authMiddleware');
// Route for registering a new user
router.post('/register', UserController.register);

// Route for user login
router.post('/login', UserController.login);

router.get('/setting', authMiddleware, UserController.getUserinfo);

router.put('/setting', authMiddleware, UserController.update);

module.exports = router;
