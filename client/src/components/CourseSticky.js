import React from "react";

const CourseSticky = ({ courseInfo }) => {
  const addToCart = async (e) => {
    try {
      const body = { course_id: courseInfo["id"] };
      const response = await fetch(
        "http://localhost:4000/dashboard/courses/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            jwt_token: localStorage.token,
          },
          body: JSON.stringify(body),
        }
      );

      const parseResponse = await response.json();

      console.log(parseResponse);
    } catch (err) {
      console.error(err.message);
    }
  };

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
      {localStorage.token && "id" in courseInfo && (
        <button
          onClick={() => addToCart(courseInfo["id"])}
          className="px-4 py-2 mx-3 rounded-2xl bg-yellow-300 hover:bg-yellow-400"
        >
          Add to Cart
        </button>
      )}
    </div>
  );
};

export default CourseSticky;
