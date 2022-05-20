const chalk = require("chalk");
const debug = require("debug")("robots:api-database:root");
const mongoose = require("mongoose");

const connectDataBase = (connectionString) =>
  new Promise((resolve, reject) => {
    mongoose.set("debug", true);
    mongoose.set("toJSON", {
      virtuals: true, // PARA PODER QUITAR IDs
      transform: (doc, ret) => {
        const newReturnedJSO = { ...ret };
        // eslint-disable-next-line no-underscore-dangle
        delete newReturnedJSO._id;
        // eslint-disable-next-line no-underscore-dangle
        delete newReturnedJSO.__v;
        return newReturnedJSO;
      },
    });
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
