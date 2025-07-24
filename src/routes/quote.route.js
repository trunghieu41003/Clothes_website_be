const express = require('express');
const router = express.Router();
const QuoteController = require('../controllers/quote.controller');
const { authMiddleware, isAdminMiddleware } = require('../middleware/authMiddleware');

// Public
router.post('/', QuoteController.create);

// Admin only
router.get('/', authMiddleware, isAdminMiddleware, QuoteController.getAll);

module.exports = router;
