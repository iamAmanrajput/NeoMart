import { Colors } from "@/constants/colors";
import { addToCart, removeFromCart } from "@/redux/slices/cartSlice";
import { Minus, Plus } from "lucide-react";
import React from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

const CartProduct = ({ name, price, _id, image, quantity, stock }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="border w-fit rounded-2xl overflow-clip grid z-1 relative hover:shadow-md">
      <img
        src={image}
        alt={name}
        className="w-[30rem] sm:w-[20rem] h-[20rem] object-cover rounded-t-2xl"
      />
      <div className="px-3 grid gap-1 py-2 absolute bg-white dark:bg-zinc-900 w-full bottom-0 rounded-xl">
        <h2 className="text-md">{name}</h2>
        <h2 className="text-md font-semibold">₹ {price}</h2>
        <div className="flex justify-between my-2">
          <div className="flex gap-3 items-center">
            <div className="flex items-center gap-5 bg-gray-100 rounded-lg px-3 py-2 w-fit ">
              <Minus
                className="cursor-pointer"
                size={15}
                stroke={Colors.customGray}
                onClick={() => {
                  quantity >= 2
                    ? dispatch(removeFromCart({ _id, quantity: 1, price }))
                    : (quantity = 1);
                }}
              />{" "}
              <span className="text-slate-950 text-sm sm:text-md">
                {quantity}
              </span>{" "}
              <Plus
                className="cursor-pointer"
                size={15}
                stroke={Colors.customGray}
                onClick={() => {
                  stock === quantity
                    ? toast.error("Maximum Stock Reached")
                    : dispatch(addToCart({ _id, quantity: 1, price }));
                }}
              />
            </div>
          </div>
          <Button onClick={() => navigate("/checkout")} size="sm">
            Buy Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartProduct;
