import { Colors } from "@/constants/colors";
import React from "react";
import { motion } from "framer-motion";

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
    <motion.div
      className="flex justify-between items-center p-3 rounded-xl bg-gray-100 dark:bg-zinc-900 shadow hover:shadow-lg transition-shadow duration-300"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03, boxShadow: "0 6px 24px rgba(0,0,0,0.10)" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="flex flex-row items-center gap-3">
        <img
          src={image.url || image}
          alt={name}
          className="w-20 sm:w-24 h-20 sm:h-24 rounded-lg object-cover border border-gray-200 dark:border-zinc-800"
        />
        <div className="grid gap-1">
          <h1 className="font-semibold text-base sm:text-lg">{name}</h1>
          <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs sm:text-sm text-gray-500 dark:text-customGray items-center font-semibold">
            <span className="flex items-center gap-1">
              Color:{" "}
              <span
                className="w-4 h-4 rounded-full inline-block border"
                style={{ backgroundColor: color }}
                title={color}
              />
            </span>
            <span>|</span>
            <span>
              Qty:{" "}
              <span className="font-bold text-customYellow">{quantity}</span>
            </span>
            <span>|</span>
            <span>
              Price:{" "}
              <span className="font-bold text-customYellow">₹{price}</span>
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CheckoutProduct;
