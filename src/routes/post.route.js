const express = require('express');
const router = express.Router();
const PostController = require('../controllers/post.controller');
const { authMiddleware, isAdminMiddleware } = require('../middleware/authMiddleware');

// Public
router.get('/', PostController.getAll);

// Admin
router.post('/', authMiddleware, isAdminMiddleware, PostController.create);
router.put('/:id', authMiddleware, isAdminMiddleware, PostController.update);
router.delete('/:id', authMiddleware, isAdminMiddleware, PostController.delete);

module.exports = router;
