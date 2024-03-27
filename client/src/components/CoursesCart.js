import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CoursesCart = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);

  const getCourses = async () => {
    try {
      const response = await fetch("http://localhost:4000/dashboard/courses", {
        method: "GET",
        headers: { jwt_token: localStorage.token },
      });
      const json = await response.json();
      setCourses(json.courses);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteCourse = async (course) => {
    try {
      const body = { course_id: course };
      const response = await fetch(
        "http://localhost:4000/dashboard/courses/delete",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            jwt_token: localStorage.token,
          },
          body: JSON.stringify(body),
        }
      );
      const json = await response.json();
      setCourses(json.courses);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCourses();
  }, []);

  let courseList = courses
    // Sorts string alphanumerically
    ?.sort(function (a, b) {
      return a.toString().localeCompare(b.toString(), "en", { numeric: true });
    })
    .map((course) => (
      <button
        type="button"
        key={course}
        onClick={() => deleteCourse(course)}
        className={
          "border border-gray-400 rounded-3xl w-32 px-6 py-2 mx-4 my-2 text-center hover:bg-gray-600 hover:text-gray-50"
        }
      >
        {course}
      </button>
    ));

  return (
    <div className="flex flex-col">
      <div>Selected Courses:</div>
      <div className="flex flex-wrap">{courseList}</div>
    </div>
  );
};

export default CoursesCart;
