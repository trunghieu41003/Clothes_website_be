const express = require('express');
const router = express.Router();
const DiaryController = require('../controllers/DiaryController');
const authMiddleware = require('../middleware/authMiddleware');
// Route to create a new diary entry
router.post('/', authMiddleware, DiaryController.createDiary);

router.get('/dashboard', authMiddleware, DiaryController.getDiary);

module.exports = router;
