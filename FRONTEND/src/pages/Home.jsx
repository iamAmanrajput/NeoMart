import React from "react";
import Navbar from "../components/custom/Navbar";
import Crousel from "@/components/custom/Crousel";
import FilterMenu from "@/components/custom/FilterMenu";
import ProductList from "@/components/custom/ProductList";
import Footer from "@/components/custom/Footer";

const Home = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Crousel></Crousel>
      <FilterMenu></FilterMenu>
      <ProductList></ProductList>
      <Footer></Footer>
    </div>
  );
};

export default Home;
