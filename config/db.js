
require('dotenv').config();
const { DATABASE, USERNAME, HOST, PASSWORD, PORT } = process.env;
const Sequelize = require('sequelize');

const sequelizeInstance = new Sequelize(DATABASE, USERNAME, PASSWORD, {
    host: HOST,
    port: PORT,
    dialect: 'mysql',
    logging: log => console.log(log)
  });

module.exports = {
  sequelizeInstance,
  Sequelize,
};