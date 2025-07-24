const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/order.controller');
const { authMiddleware } = require('../middleware/authMiddleware');

// Protected
router.post('/', authMiddleware, OrderController.create);
router.get('/', authMiddleware, OrderController.getAll);

module.exports = router;
