const debug = require("debug")("robots:middlewares:errors");
const chalk = require("chalk");

const notFoundError = (req, res) => {
  res.status(404).json({ msg: "404 Page Not Found" });
  debug(chalk.redBright("Received a request for an unexisting endpoint"));
};

module.exports = { notFoundError };
