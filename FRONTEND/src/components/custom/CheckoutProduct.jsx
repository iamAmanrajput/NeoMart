import { Colors } from "@/constants/colors";
import React from "react";

const CheckoutProduct = ({
  name = "Custom design keyboard",
  price = 299,
  image = {
    url: "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  quantity = 2,
  color = Colors.customYellow,
  stock = 5,
}) => {
  return (
    <div className="flex justify-between items-center p-3 rounded-lg bg-gray-100 dark:bg-zinc-900">
      <div className="flex flex-row items-center gap-2">
        <img src={image} alt={name} className="w-20 sm:w-24 rounded-lg" />
        <div className="grid sm:gap-1">
          <h1 className="font-semibold text-sm sm:text-base">{name}</h1>
          <p className="flex flex-col sm:flex-row sm:gap-2 text-gray-500 dark:text-customGray text-xs sm:text-sm my-0">
            <span className="font-semibold">
              Color : <span style={{ backgroundColor: color }}>{color}</span>{" "}
            </span>
            <span className="hidden sm:block">|</span>
            <span className="font-semibold">
              Qty :
              <span className="font-bold text-customYellow"> {quantity}</span>
            </span>
            <span className="hidden sm:block">|</span>
            <span className="font-semibold">
              Price :
              <span className="font-bold text-customYellow"> ₹{price}</span>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutProduct;
