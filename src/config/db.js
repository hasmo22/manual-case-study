require('dotenv').config();
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(`mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:3306/manualdb`, {logging: false});

module.exports = sequelize;