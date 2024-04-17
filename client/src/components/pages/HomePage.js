import React from "react";
import Layout from "../Layout";

const HomePage = () => {
  return (
    <Layout>
      <div className="text-2xl">Welcome to Academic Planner</div>
      <div className="text-xl font-bold my-2">Course Page</div>
      <div className="ml-4">List of all CSE courses in UCSC as of 2023.</div>
      <div className="ml-4">
        Click on a course to view its information from the UCSC CSE Catalog.
      </div>
      <div className="text-xl font-bold my-2">Scheduler Page</div>
      <div className="ml-4">
        Register for an account to use the <b>Scheduler</b> page. When logged
        in, visit the <b>Course</b> page to add courses to your cart, which you
        can view and remove courses from in your <b>Profile</b> page.
      </div>
      <div className="mt-2 ml-4">
        When all courses are selected, visit the <b>Scheduler</b> page to view a
        possible order to take those classes and an interactive curriculum
        chart.
      </div>
    </Layout>
  );
};

export default HomePage;
