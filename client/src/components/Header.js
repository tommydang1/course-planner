import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Header = () => {
  const authToken = localStorage.token;

  return (
    // <a href="https://www.flaticon.com/free-icons/event" title="event icons">Event icons created by Freepik - Flaticon</a>
    <header className="flex justify-between h-16 px-8 mb-8 bg-ucscblue">
      <div className="flex items-center flex-1 justify-start">
        <div className="flex items-center pr-10">
          <Link to="/">
            <img className="w-10 mx-2 my-3" src={logo} alt="" />
          </Link>
        </div>
        <div className="mr-4">
          <Link to="/courses">
            <div className="px-4 py-2 text-xl text-gray-100 hover:text-gray-300">
              Course List
            </div>
          </Link>
        </div>
        <Link to="/scheduler">
          <div className="px-4 py-2 text-xl text-gray-100 hover:text-gray-300">
            Scheduler
          </div>
        </Link>
      </div>

      {authToken ? (
        <div className="flex items-center">
          <Link to="/profile">
            <div className="px-4 py-2 text-xl text-gray-100 hover:text-gray-300">
              Profile
            </div>
          </Link>
        </div>
      ) : (
        <div className="flex items-center flex-1 justify-end">
          <div className="mr-4">
            <Link to="/login">
              <div className="px-4 py-2 text-xl text-gray-100 hover:text-gray-300">
                Sign In
              </div>
            </Link>
          </div>
          <Link to="/register">
            <div className="px-4 py-2 text-xl text-gray-100 hover:text-gray-300">
              Sign Up
            </div>
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
