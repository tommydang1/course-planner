const express = require("express");
const router = express.Router();
const usersController = require("../controllers/coursesController");

router
  .route("/")
  .get(usersController.getAllCourses)
  .post(usersController.createNewCourse)
  .patch(usersController.updateCourse)
  .delete(usersController.deleteCourse);

module.exports = router;
