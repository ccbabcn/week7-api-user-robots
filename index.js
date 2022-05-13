require("dotenv").config();

const debug = require("debug");
const chalk = require("chalk");

const connectDataBase = require("./database/index");
const initializeSEerver = require("./server/initializeServer");

(async () => {
  try {
    await connectDataBase(process.env.MONGO_STRING);
    await initializeSEerver(process.env.PORT || 400);
  } catch (error) {
    debug(chalk.red("Error initializing server"));
  }
})();
