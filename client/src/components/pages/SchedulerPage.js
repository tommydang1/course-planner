import React, { useState, useEffect } from "react";
import Layout from "../Layout";
import Flow from "../flow";
import { topoSort } from "../../helpers/topoSort";
import prereqsCSE from "../../data/cse/prereqs.json";

const SchedulerPage = () => {
  const [courses, setCourses] = useState([]);
  const [courseOrder, setCourseOrder] = useState(<></>);

  const getCourses = async () => {
    try {
      const response = await fetch("http://localhost:4000/dashboard/courses", {
        method: "GET",
        headers: { jwt_token: localStorage.token },
      });
      const json = await response.json();
      return json;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCourses().then((response) => {
      setCourses(response.courses);
    });
  }, []);

  useEffect(() => {
    const courseSchedule = topoSort(courses, prereqsCSE);

    setCourseOrder(
      courseSchedule?.map((course) => <ol key={course}>{course}</ol>)
    );
  }, [courses]);

  return (
    <Layout>
      {!courses?.length ? (
        <div>Log in and add classes to your cart to use the scheduler page</div>
      ) : (
        <div className="flex justify-between">
          <div className="border pr-20">
            Possible Course Order:
            {courseOrder}
          </div>

          <Flow courses={courses} prereqsJSON={prereqsCSE} />
        </div>
      )}
    </Layout>
  );
};

export default SchedulerPage;
