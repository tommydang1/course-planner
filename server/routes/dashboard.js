const express = require("express");
const router = express.Router();
const authorize = require("../middleware/authorize");
const pool = require("../db/db");

// Get courses array
router.get("/courses", authorize, async (req, res) => {
  try {
    const user = await pool.query(
      "SELECT courses FROM users WHERE user_id = $1",
      [req.user.id]
    );

    res.json(user.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// Add user course
router.post("/courses/add", authorize, async (req, res) => {
  try {
    const { course_id } = req.body;

    const newCourse = await pool.query(
      "UPDATE users SET courses = ARRAY_APPEND(ARRAY_REMOVE(courses, $1), $1) WHERE user_id = $2 RETURNING *",
      [course_id, req.user.id]
    );

    res.json(newCourse.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// Delete user course
router.delete("/courses/delete", authorize, async (req, res) => {
  try {
    const { course_id } = req.body;
    const deleteCourse = await pool.query(
      "UPDATE users SET courses = ARRAY_REMOVE(courses, $1) WHERE user_id = $2 RETURNING *",
      [course_id, req.user.id]
    );

    res.json(deleteCourse.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// Delete all user courses
// router.delete("/courses", authorize, async (req, res) => {
//   try {
//     const deleteCourse = await pool.query(
//       "UPDATE users SET courses = ARRAY_REMOVE(courses, $1) WHERE user_id = $2 RETURNING *",
//       [id, req.user.id]
//     );

//     res.json(deleteCourse.rows[0]);
//   } catch (err) {
//     console.error(err.message);
//   }
// });

module.exports = router;
