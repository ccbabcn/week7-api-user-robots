const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const robotsRouter = require("./routers/robotRouters");

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
app.use(robotsRouter);

module.exports = app;
