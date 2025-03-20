const { Sequelize } = require('sequelize');
require("dotenv").config();

// Option 1: Passing a connection URI
//const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname') // Example for postgres


// Option 3: Passing parameters separately 
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    logging: msg => console.log(msg),
});





module.exports = sequelize