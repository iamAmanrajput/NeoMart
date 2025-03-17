import { Colors } from "@/constants/colors";
import { addToCart, removeFromCart } from "@/redux/slices/cartSlice";
import { Minus, Plus } from "lucide-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import useRazorpay from "@/hooks/use-razorpay";

const CartProduct = ({
  name,
  price,
  _id,
  image,
  rating,
  quantity,
  stock,
  blacklisted,
  color,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { generatePayment, verifyPayment } = useRazorpay();

  const handleBuyNow = async () => {
    if (!isAuthenticated) {
      toast.error("Please log in first to purchase this product.");
      navigate("/login");
      return;
    }
    if (quantity > stock) {
      toast.error("Product Out of stock");
      return;
    }
    if (blacklisted) {
      toast.error("Product isn't available for purchase");
      return;
    }
    if (color == "") {
      toast.error("Please Select a Color");
      return;
    }

    const order = await generatePayment(price * quantity);
    await verifyPayment(
      order,
      [{ id: _id, quantity, color }],
      "123 Main Street"
    );
  };

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
                size={15}
                stroke={Colors.customGray}
                onClick={() =>
                  dispatch(removeFromCart({ _id, quantity: 1, price }))
                }
              />{" "}
              <span className="text-slate-950 text-sm sm:text-md">
                {quantity}
              </span>{" "}
              <Plus
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
          <Button onClick={handleBuyNow} size="sm">
            Buy Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartProduct;
