const sequelize = require('sequelize');
const sqlite3 = require('sqlite3').verbose();
require('dotenv').config();
require('dotenv').config({path: __dirname + '/.env'});
const databaseName = process.env.databaseStorage ;
const path = require('path');

let connection = new sequelize({
    dialect: 'sqlite',
    pool: {
        max: 5,
        min: 0,
        idle: 10000,
    },
    storage: path.join(process.cwd(), 'db', `${databaseName}.sqlite`),
});

const beforeAction = async () => {
    await connection.authenticate();
    // await connection.drop();
    await connection.sync()
    .then(() => console.log('Connection to the database has been established successfully'))
    .catch((error) => console.log('error is ', error));
    };
beforeAction();


module.exports = connection;