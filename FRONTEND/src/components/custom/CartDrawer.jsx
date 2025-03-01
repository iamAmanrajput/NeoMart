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

const CartDrawer = () => {
  const totalItems = 5;
  return (
    <Drawer>
      <DrawerTrigger className="relative">
        {totalItems > 0 && (
          <Badge className={`absolute px-1 py-0`}>{totalItems}</Badge>
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
            Total Items : {totalItems} <br />
            Total Price : ₹ 500
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <Button>Checkout</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default CartDrawer;
