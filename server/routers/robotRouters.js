const express = require("express");
const { getRobots, deleteRobot } = require("../controllers/robotsControllers");

const robotsRouter = express.Router();

robotsRouter.get("/", getRobots); // llega desde el index del servidor y enruta las peticiones con metodo get
robotsRouter.delete("/delete/:idRobot", deleteRobot);

// si hay un error y no hay middleware de errores saldrá un uncaught error

// ejemploComplejoRouter.get("/", middlewareUno,middleware2,(res,res,next ()=>{}))

module.exports = robotsRouter;
