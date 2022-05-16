const debug = require("debug")("robots:controllers");
const chalk = require("chalk");

const Robot = require("../../database/models/Robot");

const getRobots = async (req, res) => {
  // si no se pone el async,
  const robots = await Robot.find(); // devuelve un objecto promise alike que se comporta como una promesa (puede dar problemas en sonarCloud, falso positivo)
  res.status(200).json({ robots });
  debug(chalk.white("Received a get request to the data base"));
};

const getRobotsVelocityLess = async (req, res) => {
  const { userId } = req.headers;
  const robots = await Robot.find({ owner: userId });
  // velocity: { $lt: 5 }{owner: "idedeowner"} se le pide todos los robots con veloidad menor a 5 o solo con ese dueño
  res.status(200).json({ robots });
  debug(chalk.white("Received a get request to the data base"));
};

const deleteRobot = async (req, res) => {
  const { idRobot } = req.params;
  await Robot.findByIdAndDelete(idRobot);
  res.status(200).json({ msg: "robot deleted" });
  debug(chalk.white("Received a get request to the data base"));
};

module.exports = { getRobots, deleteRobot, getRobotsVelocityLess };
