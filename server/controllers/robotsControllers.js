const debug = require("debug")("robots:controllers");
const chalk = require("chalk");

const Robot = require("../../database/models/Robot");

const getRobots = async (req, res) => {
  const robots = await Robot.find();
  res.status(200).json({ robots });
  debug(chalk.white("Received a get request to the data base"));
};

module.exports = { getRobots };
