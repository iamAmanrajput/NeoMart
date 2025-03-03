import React from "react";
import Crousel from "@/components/custom/Crousel";
import FilterMenu from "@/components/custom/FilterMenu";
import ProductList from "@/components/custom/ProductList";

const Home = () => {
  return (
    <div>
      <Crousel></Crousel>
      <FilterMenu></FilterMenu>
      <ProductList></ProductList>
    </div>
  );
};

export default Home;
