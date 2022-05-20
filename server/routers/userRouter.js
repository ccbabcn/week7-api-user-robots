const express = require("express");
const { validate } = require("express-validation");
const { loginUser, userRegister } = require("../controllers/usersControllers");
const credentialsSchema = require("../sechemas/userCredentials");

// npm i express-validation

const userRouter = express.Router();

userRouter.post = ("/login", validate(credentialsSchema), loginUser);
userRouter.post = ("/create", userRegister);

module.exports = userRouter;
