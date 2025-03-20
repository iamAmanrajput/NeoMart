import React from "react";
import ProductCard from "./ProductCard";
import { useSelector } from "react-redux";
import Loader from "./Loader";
import { Colors } from "@/constants/colors";

const ProductList = () => {
  const { products } = useSelector((state) => state.product);
  const { homepageLoader } = useSelector((state) => state.product);

  return (
    <>
      {homepageLoader ? (
        <div className="flex justify-center my-10">
          {" "}
          <Loader width={7} height={30} color={Colors.customGray} />
        </div>
      ) : (
        <div className="w-[92.5vw] grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 mx-auto gap-5 place-content-center my-10">
          {products?.map((product) => (
            <ProductCard key={product._id} {...product} />
          ))}
        </div>
      )}
    </>
  );
};

export default ProductList;
