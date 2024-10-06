const { createCourse } = require("../controllers/course.controller");
const { verifyJWT } = require("../middlewares/auth.middleware");
const { courseSchema } = require("../models/user.model");
const { Router } = require("express");

const courseRouter = Router();

courseRouter.post("/createCourse", verifyJWT, createCourse);

module.exports = {
  courseRouter,
};
