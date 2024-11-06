const User = require('./user');
const Diary = require('./diary');
const Exercise = require('./exercise');
const DiaryExercise = require('./diary_exercise');

// Thiết lập quan hệ
User.hasMany(Diary, { foreignKey: 'user_id' });
Diary.belongsTo(User, { foreignKey: 'user_id' });

Diary.belongsToMany(Exercise, { through: DiaryExercise, foreignKey: 'diary_id' });
Exercise.belongsToMany(Diary, { through: DiaryExercise, foreignKey: 'exercise_id' });


DiaryExercise.belongsTo(Diary, { foreignKey: 'diary_id' });
DiaryExercise.belongsTo(Exercise, { foreignKey: 'exercise_id' }); // This line establishes the association

module.exports = {
    User,
    Diary,
    Exercise,
    DiaryExercise,
};
