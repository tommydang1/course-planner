import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./components/pages/HomePage";
import CoursesPage from "./components/pages/CoursesPage";
import SchedulerPage from "./components/pages/SchedulerPage";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/scheduler" element={<SchedulerPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
