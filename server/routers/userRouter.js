const express = require("express");
const { loginUser, userRegister } = require("../controllers/usersControllers");

const userRouter = express.Router();

userRouter.post = ("/login", loginUser);
userRouter.post = ("/create", userRegister);

module.exports = userRouter;
