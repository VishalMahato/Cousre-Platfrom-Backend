const { userSchema } = require("../models/user.model");
const { Router } = require("express");
const { registerUser, loginUser } = require("../controllers/user.controller");

const userRouter = Router();

userRouter.post("/signup", registerUser);

userRouter.post("/signin", loginUser);

module.exports = {
  userRouter,
};
