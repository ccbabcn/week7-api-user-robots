const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const robotsRouter = require("./routers/robotRouters");
const { notFoundError, generalError } = require("./middlewares/errors");
const userRouter = require("./routers/userRouter");
const auth = require("./middlewares/auth");

const app = express(); //

// app.use definie que aqui en este punto registre un middleware y lo ejequite en el orden descrito

app.use(cors()); // cors en primero si no dara problemas de coneccion, lee la requiest para saber los origines
// añadir helmet si se necesita o se desea

app.use(morgan("dev")); // invoc un middleware que pasa toda la informacion de la request a la consola

app.use(express.json()); // metodo de express que del paquete de informacion que se envia mediante la petidion (request al server) devuelve un middleware al que añade la propiedad body al objecto req, siempre que la peticiion venga en formato json

// app.use(auth); protegeria todas las peticiones a mi api despues de esta ceclaracion
app.use("/robots", auth, robotsRouter); // handlers o manejador de rutas, pasa todas las request que usan /robots* al enroutador
app.use("/user", userRouter);
app.use(express.static("uploads")); // sirve los recursos estaticos del interior

app.use(notFoundError);
app.use(generalError);

module.exports = app;
