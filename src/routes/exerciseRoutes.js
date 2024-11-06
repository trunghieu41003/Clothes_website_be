const express = require('express');
const router = express.Router();
const ExerciseController = require('../controllers/ExerciseController');


// Route để thêm bài tập vào nhật ký
router.post('/', ExerciseController.AddNewExercise);

router.get('/', ExerciseController.getAllExercises);

router.put('/:exerciseID', ExerciseController.updateExercise);

router.delete('/:exerciseID', ExerciseController.deleteExercise);


module.exports = router;
