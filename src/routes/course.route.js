const {
  createCourse,
  getAllCourses,
} = require("../controllers/course.controller");
const { verifyJWT } = require("../middlewares/auth.middleware");
const { Course } = require("../models/course.model");
const { Router } = require("express");

const courseRouter = Router();

courseRouter.post("/createCourse", verifyJWT, createCourse);

courseRouter.get("/getCourse", getAllCourses);

module.exports = {
  courseRouter,
};
