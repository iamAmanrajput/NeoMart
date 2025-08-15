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
      <DrawerTrigger asChild className="relative">
        <Button variant="outline" className="relative" size="icon">
          <ShoppingCart className="size-4 text-zinc-600 dark:text-zinc-300 cursor-pointer"></ShoppingCart>
          {totalQuantity > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 animate-pulse flex items-center justify-center p-0 text-xs">
              {totalQuantity}
            </Badge>
          )}
        </Button>
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
