const sequelize = require('../config/db');
const { Questionnaire } = require('./Questionnaire');
const { Question } = require('./Question');
const { Answer } = require('./Answer');

Questionnaire.hasMany(Question, { foreignKey: 'questionnaireId', as: 'Questions' });
Question.belongsTo(Questionnaire, { foreignKey: 'questionnaireId' });

Question.hasMany(Answer, { foreignKey: 'questionId', as: 'Answers' });
Answer.belongsTo(Question, { foreignKey: 'questionId' });

module.exports = {
    sequelize,
    Questionnaire,
    Question,
    Answer
};