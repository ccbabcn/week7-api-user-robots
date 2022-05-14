const debug = require("debug")("robots:middlewares:errors");
const chalk = require("chalk");

const notFoundError = (req, res) => {
  res.status(404);
  debug(chalk.redBright("Received a request for an unexisting endpoint"));
};

module.exports = { notFoundError };
