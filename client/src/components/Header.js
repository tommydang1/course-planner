import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Header = () => {
  return (
    // <a href="https://www.flaticon.com/free-icons/event" title="event icons">Event icons created by Freepik - Flaticon</a>
    <header className="flex flex-none h-16 px-8 mb-8 bg-ucscblue">
      <div className="flex items-center flex-1 justify-start">
        <div className="flex items-center">
          <Link to="/">
            <img className="w-10 mx-2 my-3" src={logo} alt="" />
          </Link>
        </div>
        <div className="pl-10 pr-4">
          <Link to="/courses">
            <div className="text-xl m-4 text-gray-100 hover:text-gray-300">
              Course List
            </div>
          </Link>
        </div>
        <Link to="/scheduler">
          <div className="text-xl m-4 text-gray-100 hover:text-gray-300">
            Scheduler
          </div>
        </Link>
      </div>
    </header>
  );
};

export default Header;
