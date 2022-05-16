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

app.use(express.json());

app.use("/robots", auth, robotsRouter); // handlers o manejador de rutas, pasa todas las request que usan /robots* al enroutador
app.use("/user", userRouter);

app.use(notFoundError);
app.use(generalError);

module.exports = app;
