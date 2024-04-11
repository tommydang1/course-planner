import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../Layout";
import CoursesCart from "../CoursesCart";

const ProfilePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.token) {
      navigate("/login");
    }
  }, [localStorage.token]);

  const handleLogout = async (e) => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Layout>
      <div>Profile Page</div>
      <button
        className={
          "bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-700 rounded"
        }
        onClick={(e) => handleLogout(e)}
      >
        Log Out
      </button>
      <CoursesCart />
    </Layout>
  );
};

export default ProfilePage;
