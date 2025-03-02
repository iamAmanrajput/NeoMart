import React from "react";
import Navbar from "@/components/custom/Navbar";
import Footer from "@/components/custom/Footer";

const Product = () => {
  const imageArray = [
    {
      url: "https://res.cloudinary.com/dmljeib0i/image/upload/v1737486186/products/l8hine0k4jwlw9jmujvz.jpg",
      id: 1,
    },
    {
      url: "https://res.cloudinary.com/dmljeib0i/image/upload/v1737486186/products/l8hine0k4jwlw9jmujvz.jpg",
      id: 2,
    },
    {
      url: "https://res.cloudinary.com/dmljeib0i/image/upload/v1737486186/products/l8hine0k4jwlw9jmujvz.jpg",
      id: 3,
    },
    {
      url: "https://res.cloudinary.com/dmljeib0i/image/upload/v1737486186/products/l8hine0k4jwlw9jmujvz.jpg",
      id: 4,
    },
  ];
  return (
    <div>
      <Navbar></Navbar>

      <div>
        <main className="w-[92.5vw] lg:w-[70vw] flex flex-col sm:flex-row justify-start items-start gap-10 mx-auto my-10">
          {/* left side */}
          <div className="grid sm:w-[50%] gap-3">
            <img
              src={imageArray[0].url}
              className="w-full lg:[30rem] rounded-xl object-center object-cover border dark:border-none "
            />
            <div className="grid grid-cols-4 gap-3">
              {imageArray.map((image) => (
                <img
                  key={image.id}
                  src={image.url}
                  className="rounded-xl filter hover:brightness-50 cursor-pointer transition-all ease-in-out duration-300 border dark:border-none"
                />
              ))}
            </div>
          </div>

          {/* right side */}
        </main>

        {/* review section */}
      </div>

      <Footer></Footer>
    </div>
  );
};

export default Product;
