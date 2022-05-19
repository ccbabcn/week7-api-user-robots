const debug = require("debug")("robots:middlewares:errors");
const chalk = require("chalk");

const notFoundError = (req, res) => {
  res.status(404).json({ msg: "404 endpoint Not Found" });
  debug(chalk.redBright("Received a request for an unexisting endpoint"));
};

// eslint-disable-next-line no-unused-vars
const generalError = (error, re, res, next) => {
  const statusCode = error.statusCode ?? 500;
  const errorMessage = error.customMessages ? error.message : "general pete";

  debug(chalk.redBright(`Internal server error: ${error.message}`));
  res.status(statusCode).json({ msg: errorMessage });
};

module.exports = { notFoundError, generalError };
