const express = require("express");
const cors = require("cors");
const pool = require("./db");
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes START

// Create a course
app.post("/courses", async (req, res) => {
  try {
    const { description } = req.body;
    const newCourse = await pool.query(
      "INSERT INTO course (description) VALUES($1) RETURNING *",
      [description]
    );

    res.json(newCourse);
  } catch (err) {
    console.error(err.message);
  }
});

// Get all courses
app.get("/courses", async (req, res) => {
  try {
    const allCourses = await pool.query("SELECT * FROM course");

    res.json(allCourses.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// Get a course
app.get("/courses/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const course = await pool.query(
      "SELECT * FROM course WHERE course_id = $1",
      [id]
    );

    res.json(course.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// Update a course
app.put("/courses/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateCourse = await pool.query(
      "UPDATE course SET description = $1 WHERE course_id = $2",
      [description, id]
    );

    res.json("Course updated");
  } catch (err) {
    console.error(err.message);
  }
});

// Delete a course
app.delete("/courses/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteCourse = await pool.query(
      "DELETE FROM course WHERE course_id = $1",
      [id]
    );

    res.json("Course deleted");
  } catch (err) {
    console.error(err.message);
  }
});

// Routes END

// Run server

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
