import React, { useState } from "react";
import CoursesDisplay from "../CoursesDisplay";
import Layout from "../Layout";
import coursesData from "../../data/cse/scraped_cse_data.json";
import CourseSticky from "../CourseSticky";

const CoursesPage = () => {
  const [courseInfo, setCourseInfo] = useState({});
  const displayToName = (displayName) => {
    for (let i = 0; i < coursesData["courses"].length; i++) {
      if (coursesData["courses"][i]["id"] === displayName) {
        setCourseInfo(coursesData["courses"][i]);
        break;
      }
    }
  };

  return (
    <Layout>
      <div className="text-3xl font-bold pb-4">Courses</div>
      <div className="border border-black font-bold text-xl mb-4 p-2">
        <div> Filters </div>
        <div className="flex">
          <input type="checkbox" className="checked:bg-blue-500" />
          <div className="text-base font-normal"> WIP </div>
        </div>
      </div>
      <div className="flex">
        <div className="w-2/3">
          <div className="text-2xl font-bold">Lower Div</div>
          <CoursesDisplay
            division="Lower Division"
            displayToName={displayToName}
          />
          <div className="text-2xl font-bold">Upper Div</div>
          <CoursesDisplay
            division="Upper Division"
            displayToName={displayToName}
          />
          <div className="text-2xl font-bold">Graduate</div>
          <CoursesDisplay division="Graduate" displayToName={displayToName} />
        </div>
        <CourseSticky courseInfo={courseInfo} />
      </div>
    </Layout>
  );
};

export default CoursesPage;
