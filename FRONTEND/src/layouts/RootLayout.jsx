import React from "react";
import Navbar from "../components/custom/Navbar";
import Footer from "../components/custom/Footer";

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
