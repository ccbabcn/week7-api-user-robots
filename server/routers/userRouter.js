const express = require("express");
const loginUser = require("../controllers/usersControllers");

const userRouter = express.Router();

userRouter.post = ("/going", loginUser);

module.exports = userRouter;
