const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/product.controller');
const { authMiddleware, isAdminMiddleware } = require('../middleware/authMiddleware');

// Public
router.get('/', ProductController.getAll);

// Admin
router.post('/', authMiddleware, isAdminMiddleware, ProductController.create);
router.put('/:id', authMiddleware, isAdminMiddleware, ProductController.update);
router.delete('/:id', authMiddleware, isAdminMiddleware, ProductController.delete);

module.exports = router;
