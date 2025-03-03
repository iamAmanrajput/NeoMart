import React from "react";
import Navbar from "../custom/Navbar";
import Footer from "../custom/Footer";

const RootLayout = ({ children }) => {
  return (
    <>
      <Navbar></Navbar>
      {children}
      <Footer></Footer>
    </>
  );
};

export default RootLayout;
