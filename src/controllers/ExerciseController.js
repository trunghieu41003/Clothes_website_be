const { DiaryExercise, Exercise } = require('../models/index');
const DiaryController = require('../controllers/DiaryController');
const ExerciseController = {

    async AddNewExercise(req, res) {
        try {
            const { userId, date, exerciseID, time, status, weight } = req.body;
            // Tìm diaryId dựa trên userId và ngày
            console.log({ userId, date });
            const diary = await DiaryController.findDiaryId(userId, date);
            const diaryId = diary.diaryId;
            console.log({ diaryId });
            // Kiểm tra xem bài tập đã tồn tại trong DiaryExercise chưa
            const existingExercise = await DiaryExercise.findOne({
                where: { diary_id: diaryId, exercise_id: exerciseID }
            });
            if (existingExercise) return res.status(400).json({ message: 'Exercise này đã tồn tại' });

            // Tìm `met` từ bảng Exercise
            const exercise = await Exercise.findByPk(exerciseID);
            console.log({ exercise });
            const calories_burned = exercise.dataValues.met * weight * time;

            // Thêm bài tập mới vào DiaryExercise
            await DiaryExercise.create({
                diary_id: diaryId,
                exercise_id: exerciseID,
                time: time,
                status: status,
                calories_burned: calories_burned,
                weight: weight
            });

            await DiaryController.updateDiary(diaryId);

            return res.status(201).json({ message: 'Exercise đã được thêm thành công' });
        } catch (error) {
            console.error('Error in AddNewExercise:', error);
            return res.status(500).json({ message: 'Lỗi khi thêm bài tập mới.' });
        }
    },
    async getAllExercises(req, res) {
        const { userId, date } = req.query; // Get userId and date from request body
        try {
            // Find diaryId based on userId and date
            const diary = await DiaryController.findDiaryId(userId, date);
            const diaryId = diary.diaryId;

            // Retrieve all exercises from DiaryExercise for the specified diaryId
            const exercises = await DiaryExercise.findAll({
                where: { diary_id: diaryId },
                include: [
                    {
                        model: Exercise, // Assuming you want to include exercise details
                        attributes: ['exercise_id', 'name', 'met'] // Modify as needed to include relevant exercise fields
                    }
                ]
            });

            // Check if any exercises were found
            if (!exercises || exercises.length === 0) {
                return res.status(404).json({ message: 'No exercises found for this date.' });
            }

            return res.json(exercises);
        } catch (error) {
            console.error('Error in getExercisesByUserAndDate:', error);
            return res.status(500).json({ message: 'Error retrieving exercises.', error });
        }
    },

    async updateExercise(req, res) {
        const { exerciseID } = req.params;
        const { userId, date, time, status, weight } = req.body; // Get userId and date from request body

        try {
            const diary = await DiaryController.findDiaryId(userId, date);
            if (!diary || diary.error) {
                return res.status(400).json({ message: diary.message || 'Diary not found.' });
            }
            const diaryId = diary.diaryId;

            // Find the exercise entry
            const exercise = await Exercise.findByPk(exerciseID);
            if (!exercise) {
                return res.status(404).json({ message: 'Exercise not found.' });
            }

            // Get the current DiaryExercise entry to access existing calories burned
            const currentExerciseEntry = await DiaryExercise.findOne({
                where: { diary_id: diaryId, exercise_id: exerciseID }
            });

            if (!currentExerciseEntry) {
                return res.status(404).json({ message: 'Diary exercise entry not found.' });
            }

            let calories_burned = currentExerciseEntry.calories_burned; // Default to current calories burned

            // Check if time and weight are provided for recalculation
            if (time && weight) {
                calories_burned = exercise.dataValues.met * weight * time; // Recalculate calories burned
            }

            // Update the exercise entry
            await DiaryExercise.update(
                {
                    weight: weight || currentExerciseEntry.weight, // Only update if weight is provided
                    time: time || currentExerciseEntry.time, // Only update if time is provided
                    calories_burned: calories_burned,
                    status: status // Always update status
                },
                {
                    where: { diary_id: diaryId, exercise_id: exerciseID }
                }
            );

            // Update the diary after modifying the DiaryExercise
            await DiaryController.updateDiary(diaryId);

            return res.json({ message: 'Exercise đã được cập nhật thành công' });
        } catch (error) {
            console.error('Error in updateExercise:', error);
            return res.status(500).json({ message: 'Error updating exercise.', error });
        }
    },
    async deleteExercise(req, res) {
        const { exerciseID } = req.params; // Extract exercise ID from URL parameters
        const { userId, date } = req.body; // Get userId and date from request body

        try {
            // Find the diary ID based on userId and date
            const diary = await DiaryController.findDiaryId(userId, date);
            const diaryId = diary.diaryId;

            // Check if the exercise entry exists in DiaryExercise
            const exerciseEntry = await DiaryExercise.findOne({
                where: { diary_id: diaryId, exercise_id: exerciseID }
            });

            // Delete the exercise entry
            await DiaryExercise.destroy({
                where: { diary_id: diaryId, exercise_id: exerciseID }
            });

            // Update the diary after deletion
            await DiaryController.updateDiary(diaryId);

            return res.json({ message: 'Exercise đã được xóa thành công' });
        } catch (error) {
            console.error('Error in deleteExercise:', error);
            return res.status(500).json({ message: 'Lỗi khi xóa bài tập.' });
        }
    },

    async getExercisesDetails(req, res) {
        try {
            const { exerciseID } = req.params;
            // Retrieve all exercises from Exercise
            const exercises = await Exercise.findByPk(exerciseID);
            // Check if any exercises were found
            if (!exercises || exercises.length === 0) {
                return res.status(404).json({ message: 'No exercises found' });
            }
            return res.json(exercises);
        } catch (error) {
            console.error('Error in getExercisesByUserAndDate:', error);
            return res.status(500).json({ message: 'Error retrieving exercises.', error });
        }
    },

};

module.exports = ExerciseController;
