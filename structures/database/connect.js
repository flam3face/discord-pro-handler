const mongoose = require('mongoose');
const config = require('../configuration/index');
const { logger } = require('../functions/logger');

const connect = async () => {
    mongoose.set('strictQuery', true)
    mongoose.connect(config.mongodb_url);


    mongoose.connection.once("open", () => {
        console.log("\n---------------------")
        logger("Database integration established", "success")
        console.log("---------------------")
    });
    mongoose.connection.on("error", (error) => {
        console.log("\n---------------------")
        logger(`Database connection is experiencing issues: ${error}`, "error")
        console.log("---------------------")
    })


    return;
}

module.exports = { connect };