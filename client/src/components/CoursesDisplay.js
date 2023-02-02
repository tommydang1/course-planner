import React from "react";
import coursesJSON from "../data/categories.json";

const CoursesDisplay = ({ division, displayToName }) => {
  let courses; // List of course names
  for (let i = 0; i < coursesJSON.length; i++) {
    if (coursesJSON[i]["name"] === division) {
      courses = coursesJSON[i]["courses"];
      break;
    }
  }

  let courseList = courses.map((course) => (
    <button
      type="button"
      key={course}
      onClick={() => displayToName(course)}
      className="border border-gray-400 rounded-3xl w-32 px-6 py-2 mx-4 my-2 text-center hover:bg-gray-600 hover:text-gray-50 focus:bg-gray-600 focus:text-gray-50 focus:outline focus:outline-2 focus:outline-blue-500/50"
    >
      {course}
    </button>
  ));

  return <div className="flex flex-wrap">{courseList}</div>;
};

export default CoursesDisplay;
