import React, { useState } from "react";
import Navbar from "@/components/custom/Navbar";
import Footer from "@/components/custom/Footer";
import { starGenerator } from "@/constants/Helper";
import { Circle, Minus, Plus } from "lucide-react";
import { Colors } from "@/constants/colors";

const Product = () => {
  const [productQuantity, setProductQuantity] = useState(5);
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

  const productStock = 10;

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
          <div className="sm:w-[50%] lg:w-[30%]">
            <div className="pb-5">
              <h className="font-extrabold text-2xl">My Keyboard</h>
              <p className="my-2 text-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio
                pariatur, neque voluptates quam minus repellendus deleniti
                praesentium minima sed commodi ab molestias, dolore eaque? Et
                ipsa incidunt odio perferendis!
              </p>
              <div className="flex items-center">
                {starGenerator(4.5, "0", 15)}
                <span className="text-md ml-1">(2)</span>
              </div>
            </div>
            <div className="py-5 border-t border-b">
              <h3 className="font-bold text-xl">Rs.500 or Rs.35/month</h3>
              <p className="text-sm">
                Suggested payments with 6 months special financing
              </p>
            </div>
            <div className="py-5 border-t border-b">
              <h3 className="font-bold text-xl">Choose Color</h3>
              <div className="flex items-center my-2">
                <Circle
                  fill={Colors.customIsabelline}
                  strokeOpacity={0.2}
                  strokeWidth={0.2}
                  size={40}
                />
                <Circle
                  fill={Colors.customGray}
                  strokeOpacity={0.2}
                  strokeWidth={0.2}
                  size={40}
                />
                <Circle
                  fill={Colors.customYellow}
                  strokeOpacity={0.2}
                  strokeWidth={0.2}
                  size={40}
                />
              </div>
            </div>

            <div className="py-5">
              <div className="flex gap-3 items-center">
                <div className="flex items-center gap-5 bg-gray-100 rounded-full px-3 py-2 w-fit">
                  <Minus
                    className="cursor-pointer"
                    onClick={() =>
                      setProductQuantity((qty) => (qty > 1 ? qty - 1 : 1))
                    }
                    stroke={Colors.customGray}
                  />
                  <span className="text-slate-950">{productQuantity}</span>
                  <Plus
                    onClick={() =>
                      setProductQuantity((qty) =>
                        qty < productStock ? qty + 1 : qty
                      )
                    }
                    className="cursor-pointer"
                    stroke={Colors.customGray}
                  />
                </div>
                {productStock - productQuantity > 0 && (
                  <div className="grid text-sm font-semibold text-gray-600">
                    <span>
                      Only{" "}
                      <span className="text-customYellow">
                        {productStock - productQuantity} items{" "}
                      </span>
                      left!
                    </span>
                    <span>Don't Miss it</span>
                  </div>
                )}
              </div>

              <div></div>
            </div>
          </div>
        </main>

        {/* review section */}
      </div>

      <Footer></Footer>
    </div>
  );
};

export default Product;
