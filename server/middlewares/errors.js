const debug = require("debug")("robots:middlewares:errors");
const chalk = require("chalk");

const notFoundError = (req, res) => {
  res.status(404).json({ msg: "404 endpoint Not Found" });
  debug(chalk.redBright("Received a request for an unexisting endpoint"));
};

// eslint-disable-next-line no-unused-vars
const generalError = (error, re, res, next) => {
  res.status(500).json({ msg: "Internal server error" });
  debug(chalk.redBright(`Internal server error: ${error.message}`));
};

module.exports = { notFoundError, generalError };
