import React from "react";
import { Button } from "../ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ShoppingCart } from "lucide-react";
import { Badge } from "../ui/badge";
import { useSelector } from "react-redux";
import CartProduct from "./CartProduct";
import LinkButton from "./LinkButton";

const CartDrawer = () => {
  const { cartItems, totalQuantity, totalPrice } = useSelector(
    (state) => state.cart
  );
  return (
    <Drawer>
      <DrawerTrigger className="relative">
        {totalQuantity > 0 && (
          <Badge className={`absolute px-1 py-0`}>{totalQuantity}</Badge>
        )}
        <ShoppingCart
          className="text-gray-800 dark:text-white hover:scale-105 cursor-pointer transition-all ease-in-out"
          strokeWidth={1.3}
          size={28}
        ></ShoppingCart>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Are you absolutely sure?</DrawerTitle>
          <DrawerDescription>
            Total Items : {totalQuantity} <br />
            Total Price : ₹ {totalPrice}
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col sm:flex-row justify-start gap-3 h-[70vh] overflow-y-scroll sm:overflow-y-hidden sm:h-auto mx-3">
          {cartItems.length === 0 ? (
            <h2 className="text-primary text-sm">
              Nothing To Show, Please add some products...
            </h2>
          ) : (
            cartItems.map((item) => <CartProduct key={item._id} {...item} />)
          )}
        </div>
        <DrawerFooter>
          <LinkButton to="/checkout" text="Checkout" />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default CartDrawer;
