const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/category.controller');
const { authMiddleware, isAdminMiddleware } = require('../middleware/authMiddleware');

// Public
router.get('/', CategoryController.getAll);

// Admin
router.post('/', authMiddleware, isAdminMiddleware, CategoryController.create);

module.exports = router;
