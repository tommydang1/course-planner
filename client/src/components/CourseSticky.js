import React from "react";

const CourseSticky = ({ courseInfo }) => {
  return (
    <div
      className="overflow-auto border border-gray-600 sticky top-10 w-1/3 text-center mx-10 mr-0"
      style={{ height: "60vh", minWidth: "20rem" }}
    >
      {"id" in courseInfo ? (
        <>
          <div className="font-bold text-2xl">{courseInfo["id"]}</div>
          <div className="font-bold text-lg mx-4 pb-4">
            {courseInfo["name"]}
          </div>
          <div className="text-left mx-4 pb-4">{courseInfo["description"]}</div>
        </>
      ) : (
        <div className="text-left text-xl mx-4">
          Click on a course name to display course information
        </div>
      )}

      {"link" in courseInfo && (
        <a
          href={courseInfo["link"]}
          target="_blank"
          rel="noreferrer"
          className="px-12 py-2 bottom-0 border border-blue-400 hover:bg-blue-400 hover:text-white"
        >
          {" "}
          Visit Course Page
        </a>
      )}
    </div>
  );
};

export default CourseSticky;
