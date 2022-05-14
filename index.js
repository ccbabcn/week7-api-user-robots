require("dotenv").config();

const debug = require("debug")("robots:root");
const chalk = require("chalk");
const connectDataBase = require("./database/index");
const initializeSEerver = require("./server/initializeServer");
const port = require("./cli");

(async () => {
  try {
    await connectDataBase(process.env.MONGO_STRING);
    await initializeSEerver(port);
  } catch {
    debug(chalk.red("Error initializing server"));
  }
})();
