const debug = require("debug")("robots:controllers");
const chalk = require("chalk");
const path = require("path");
const fs = require("fs");

const Robot = require("../../database/models/Robot");

const getRobots = async (req, res) => {
  // si no se pone el async,
  const robots = await Robot.find(); // devuelve un objecto promise alike que se comporta como una promesa (puede dar problemas en sonarCloud, falso positivo)
  res.status(200).json({ robots });
  debug(chalk.white("Received a get request to the data base"));
};

const getRobotsbyOwner = async (req, res) => {
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

const createRobot = async (req, res, next) => {
  const robot = req.body;
  const { file } = req; // de lo que ha añadido upload de muller
  try {
    // ha de ser asincrono para que no bloque el hilo de la ejecuccion
    // por ejemplo 100 usuarios a la vez guardando una imagen, en ocasiones se podria hacer sincrono fs.renamSync()
    fs.rename(
      path.join("uploads", "images", file.filename),
      path.join("uploads", "images", file.originalname),
      async (error) => {
        if (error) {
          debug(chalk.red(error.message));
          const customError = new Error(error.message);
          customError.message = "Error renaming file";
          customError.statusCode = 500;
          next(customError);

          return;
        }
        debug(chalk.green("file renamed correctly"));

        const newRobot = await Robot.create({
          ...robot,
          picture: path.join("uploads", "images", file.originalname),
        });

        res.status(200).json({ robot: newRobot });
      }
    );
  } catch (error) {
    // const error = new Error("Bad request");
    error.statusCode = 400;
    error.customMessage = "Bad request";
    next(error);
  }
};

module.exports = {
  getRobots,
  deleteRobot,
  getRobotsVelocityLess: getRobotsbyOwner,
  createRobot,
};
