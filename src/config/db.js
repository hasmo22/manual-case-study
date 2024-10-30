const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('mysql://root:db-password@localhost:3306/manualdb', {logging: false});

module.exports = sequelize;