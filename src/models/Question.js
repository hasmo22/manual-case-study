const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Question = sequelize.define('Question', {
    questionText: {
        type: DataTypes.STRING,
        allowNull: false
    },
    questionnaireId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, { timestamps: false });
 
module.exports = { Question }