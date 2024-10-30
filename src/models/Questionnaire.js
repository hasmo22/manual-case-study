const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Questionnaire = sequelize.define('Questionnaire', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, { timestamps: false });

module.exports = { Questionnaire };