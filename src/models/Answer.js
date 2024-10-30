const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Answer = sequelize.define('Answer', {
    answerText: {
        type: DataTypes.STRING,
        allowNull: false
    },
    recommendation: {
        type: DataTypes.STRING,
        allowNull: true
    },
    restriction: {
        type: DataTypes.STRING,
        allowNull: true
    },
    nextQuestionId: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
}, { timestamps: false });
 
 module.exports = { Answer }