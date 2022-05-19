const express = require("express");
const multer = require("multer");
const path = require("path");
const {
  getRobots,
  deleteRobot,
  createRobot,
} = require("../controllers/robotsControllers");

const robotsRouter = express.Router();
// dest define la ruta donde se guardan las imagenes, join.path metodo de node que une ruta segun el sistema donde se ejecute
robotsRouter.get("/", getRobots); // llega desde el index del servidor y enruta las peticiones con metodo get
robotsRouter.delete("/delete/:idRobot", deleteRobot);

// npm i multer para poder tratar con datos json y binarios
const upload = multer({ dest: path.join("uploads", "images"), limits });

robotsRouter.post(
  "/create/:robot",
  upload.single("iamge-NameOfFieldinDB"),
  createRobot
);
// añade como propiedad el objeto file (si se usa single) al body de la request
// si hay un error y no hay middleware de errores saldrá un uncaught error
// y guarada el archivo en el disco duro
// ejemploComplejoRouter.get("/", middlewareUno,middleware2,(res,res,next ()=>{}))

module.exports = robotsRouter;
