const Course = require("../models/courseModel");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const e = require("express");

// @desc Get all courses
// @route GET /courses
// @access Private
const getAllCourses = asyncHandler(async (req, res) => {
  // Get all courses from MongoDB
  const courses = await Course.find().lean();

  // Check for no courses
  if (!courses?.length) {
    return res.status(400).json({ message: "No courses found" });
  }

  const coursesWithUser = await Promise.all(
    courses.map(async (course) => {
      const user = await User.findById(course.user).lean().exec();
      return { ...course, username: user.username };
    })
  );

  res.json(coursesWithUser);
});

// @desc Create new course
// @route POST /courses
// @access Private
const createNewCourse = asyncHandler(async (req, res) => {
  const { user, title, units } = req.body;

  // Confirm data
  if (!user || !title || !units) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check for duplicate
  const duplicate = await Course.findOne({ title }).lean().exec();

  if (duplicate) {
    return res.status(409).json({ message: "Duplicate course" });
  }

  const courseObject = { user, title, units };

  // Create and store new course
  const course = await Course.create(courseObject);

  if (course) {
    // created
    res.status(201).json({ message: `New course ${title} created` });
  } else {
    res.status(400).json({ message: "Invalid course data receive" });
  }
});

// @desc Update a course
// @route PATCH /courses
// @access Private
const updateCourse = asyncHandler(async (req, res) => {
  const { id, user, title, units } = req.body;

  // Confirm Data
  if (!id || !user || !title || !units) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const course = await Course.findById(id).exec();

  if (!course) {
    return res.status(400).json({ message: "Course not found" });
  }

  // Check for duplicate
  const duplicate = await Course.findOne({ title }).lean().exec();

  // Allow renaming of the original course
  if (duplicate && duplicate?._id.toString() !== id) {
    return res.status(409).json({ message: "Duplicate course title" });
  }

  course.user = user;
  course.title = title;
  course.units = units;

  const updatedCourse = await course.save();

  res.json({ message: `Course ${updatedCourse.title} updated` });
});

// @desc Delete a course
// @route DELETE /courses
// @access Private
const deleteCourse = asyncHandler(async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: "Course ID required" });
  }

  const course = await Course.findById(id).exec();

  if (!course) {
    return res.status(400).json({ message: "Course not found" });
  }

  const result = await course.deleteOne();

  const reply = `Course ${result.title} with ID ${result._id} deleted`;

  res.json(reply);
});

module.exports = {
  getAllCourses,
  createNewCourse,
  updateCourse,
  deleteCourse,
};
