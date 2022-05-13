const chalk = require("chalk");
const debug = require("debug");
const { mongoose } = require("mongoose");

const connectDataBase = async (connectionString) =>
  new Promise((resolve, reject) => {
    mongoose.set("debug", true);
    mongoose.connect(connectionString, (error) => {
      if (error) {
        debug(chalk.red("error detected:", error.message));
        reject();
        return;
      }
      debug(chalk.green("connected to database"));
      resolve();
    });
  });

module.exports = connectDataBase;
