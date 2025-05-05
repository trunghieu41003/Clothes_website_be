const sequel = require('sequelize');
const mySequel = require('../config/database');
const Diary = require('./diary');
const Exercise = require('./exercise');

const DiaryExercise = mySequel.define('diary_exercise', {
    diary_id: {
        type: sequel.INTEGER,
        allowNull: false,
        references: {
            model: Diary,
            key: 'diary_id',
        },
        onDelete: 'CASCADE',
    },
    exercise_id: {
        type: sequel.INTEGER,
        allowNull: false,
        references: {
            model: Exercise,
            key: 'exercise_id',
        },
        onDelete: 'CASCADE',
    },
    time: {
        type: sequel.INTEGER,
        allowNull: true,
    },
    status: {
        type: sequel.STRING(50),
        allowNull: true,
    },
    calories_burned: {
        type: sequel.DECIMAL(5, 2),
        allowNull: true,
    },
    weight: {
        type: sequel.INTEGER,
        allowNull: true,
    },
}, {
    underscored: false,
    timestamps: false,
    paranoid: true,
    freezeTableName: true,
    tableName: 'diary_exercise',
});

module.exports = DiaryExercise;
