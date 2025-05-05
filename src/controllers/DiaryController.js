const { Diary, DiaryExercise } = require('../models/index'); // Import the Diary model
const moment = require('moment');
const { Op } = require('sequelize');
const DiaryController = {
    // Function to create a new diary entry
    async createDiary(req, res) {
        try {
            const { userId, date } = req.body;

            // Parse ngày theo định dạng YYYY-MM-DD và giữ UTC (tránh lệch)
            const inputDate = moment.utc(date, 'YYYY-MM-DD').startOf('day').toDate();

            // Kiểm tra nhật ký đã tồn tại
            const existingDiary = await Diary.findOne({
                where: {
                    user_id: userId,
                    date: inputDate
                },
            });

            if (existingDiary) {
                return res.status(400).json({ message: 'Người dùng này đã có nhật ký cho ngày này rồi.' });
            }

            // Tạo nhật ký mới
            const newDiary = await Diary.create({
                user_id: userId,
                date: inputDate,
            });

            return res.status(201).json({
                message: 'Nhật ký đã được tạo thành công.',
                diary: {
                    diary_id: newDiary.diary_id,
                    user_id: newDiary.user_id,
                    date: moment.utc(newDiary.date).format('YYYY-MM-DD')
                }
            });
        } catch (error) {
            console.error('Error in creating diary entry:', error);
            return res.status(500).json({ message: 'Lỗi khi tạo nhật ký.' });
        }
    },

    // Function to find diary ID based on userId and date
    async findDiaryId(userId, date) {
        console.log({ userId, date });
        try {
            const diary = await Diary.findOne({
                where: {
                    user_id: userId,
                    date: new Date(date)
                }
            });
            if (!diary) {
                return { error: true, message: 'Diary not found.' };
            }
            console.log('Diary found:', diary);
            return { diaryId: diary.diary_id };
        } catch (error) {
            console.error('Error finding diary ID:', error);
            return { error: true, message: 'Error finding diary ID.', details: error };
        }
    },

    // Function to update diary based on diaryId and provided data
    async updateDiary(diaryId) {
        try {
            const total_exercise = await DiaryExercise.count({ where: { diary_id: diaryId } });
            const total_time = await DiaryExercise.sum('time', { where: { diary_id: diaryId } });

            const exercise_completion = await DiaryExercise.count({
                where: { status: "completed", diary_id: diaryId }
            });
            const time_completion = await DiaryExercise.sum('time', {
                where: { status: "completed", diary_id: diaryId }
            });
            const total_calories_burned = await DiaryExercise.sum('calories_burned', {
                where: { status: "completed", diary_id: diaryId }
            });

            await Diary.update(
                {
                    total_calories_burned: total_calories_burned,
                    total_time: total_time,
                    total_exercise: total_exercise,
                    time_completion: time_completion,
                    exercise_completion: exercise_completion
                },
                {
                    where: { diary_id: diaryId }
                }
            );

            return { error: false, message: 'Diary updated successfully.' };
        } catch (error) {
            console.error('Error updating diary:', error);
            return { error: true, message: 'Error updating diary.', details: error };
        }
    },
    // Function to find all diaries for a user within the last X days
    async getRecentDiaries(req, res) {
        try {
            const { userId, days } = req.query; // Expect userId and days as query parameters
            const daysMapping = {
                '7': 7,
                '15': 15,
                '30': 30
            };

            if (!daysMapping[days]) {
                return res.status(400).json({ message: 'Days parameter must be 7, 15, or 30.' });
            }

            const dateLimit = moment().subtract(daysMapping[days], 'days').toDate(); // Calculate date limit

            // Fetch diaries for the user in the last X days
            const diaries = await Diary.findAll({
                where: {
                    user_id: userId,
                    date: {
                        [Op.gte]: dateLimit // Select diaries from the calculated date limit to now
                    }
                },
                order: [['date', 'DESC']], // Order by date descending
            });

            return res.status(200).json({
                message: `Nhật ký trong ${days} ngày qua.`,
                diaries: diaries.map(diary => ({
                    diary_id: diary.diary_id,
                    user_id: diary.user_id,
                    date: moment(diary.date).format('YYYY-MM-DD'), // Format the output date
                    total_calories_burned: diary.total_calories_burned,
                    total_time: diary.total_time,
                    total_exercise: diary.total_exercise,
                    time_completion: diary.time_completion,
                    exercise_completion: diary.exercise_completion
                }))
            });
        } catch (error) {
            console.error('Error in fetching recent diaries:', error);
            return res.status(500).json({ message: 'Lỗi khi lấy nhật ký gần đây.' });
        }
    },
    async getDiary(req, res) {
        try {
            const { userId, date } = req.query;

            // Fetch diary for the user in the specific date
            const diaries = await Diary.findOne({
                where: {
                    user_id: userId,
                    date: date
                },
            });

            return res.status(200).json({ diaries });
        } catch (error) {
            console.error('Error in fetching diary:', error);
            return res.status(500).json({ message: 'Lỗi khi lấy nhật ký.' });
        }
    }
};

module.exports = DiaryController;
