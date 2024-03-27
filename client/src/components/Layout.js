import React from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className="h-screen">
      <Header></Header>
      <div className="container px-2 mx-auto">
        <main>{children}</main>
      </div>
      <Footer></Footer>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
