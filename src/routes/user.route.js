const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');
const { authMiddleware } = require('../middleware/authMiddleware');

// Register + Get/Update profile
router.post('/register', UserController.register);
router.get('/profile/:id', authMiddleware, UserController.getProfile);

module.exports = router;
