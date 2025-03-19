import React from "react";
import LinkButton from "./LinkButton";
import { starGenerator } from "@/constants/Helper";

const ProductCard = ({
  name = "product Title",
  price = 2000,
  rating = 2.5,
  image = {
    url: "https://images.pexels.com/photos/19351991/pexels-photo-19351991/free-photo-of-black-and-white-bike-helmet.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    id: "22",
  },
}) => {
  return (
    <div className="relative border w-fit overflow-clip grid z-1 hover:shadow-md rounded-2xl">
      <img
        src={image.url}
        alt={name}
        className="object-cover w-[30rem] h-[20rem]"
      />
      <div
        tabIndex={0}
        className="px-3 grid gap-1 py-2 absolute bg-white dark:bg-zinc-900 w-full bottom-0 translate-y-[3rem] hover:translate-y-0 focus-within:translate-y-0 transform transition-all ease-in-out rounded-xl duration-300"
      >
        <h2>{name}</h2>
        <div className="flex justify-between">
          <div className="flex">{starGenerator(rating)}</div>
          <span>₹ {price}</span>
        </div>

        <LinkButton
          to={`/product/${name.split(" ").join("-")}`}
          text="View Product"
        />
      </div>
    </div>
  );
};

export default ProductCard;
