import React from "react";
import CheckoutProduct from "@/components/custom/CheckoutProduct";
import { Card } from "@/components/ui/card";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const Checkout = () => {
  return (
    <div>
      <div className="w-[90vw] mx-auto sm:w-[60vw] flex justify-between items-center sm:my-20">
        <div className="flex flex-col sm:flex-row gap-5 mx-auto my-10">
          {/* product details */}
          <div className="space-y-8">
            <div className="p-4 space-y-4">
              <h2 className="text-xl font-medium">Order Summery</h2>
              <div className="space-y-1 text-3xl">
                <CheckoutProduct></CheckoutProduct>
              </div>
              <hr />
              <div className="p-3 rounded-md">
                <p className="flex justify-between items-center">
                  <span className="font-semibold text-customGray">
                    Subtotal:
                  </span>
                  <span className="font-bold">₹599</span>
                </p>
                <p className="flex justify-between items-center">
                  <span className="font-semibold text-customGray">Tax:</span>
                  <span className="font-bold">₹0</span>
                </p>
                <p className="flex justify-between items-center">
                  <span className="font-semibold text-customGray">
                    Shipping:
                  </span>
                  <span className="font-bold">₹0</span>
                </p>
              </div>
              <hr />
              <p className="flex justify-between items-center px-3">
                <span className="font-bold">Total:</span>
                <span className="font-bold">₹599</span>
              </p>
            </div>
          </div>
          {/* personel details*/}
          <div className="w-[90vw] sm:w-[20vw]">
            <Card className="shadow-md p-4">
              <h2 className="text-xl font-medium">Billing Information</h2>
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  className="w-full mt-2"
                />
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="w-full mt-2"
                />
                <Label htmlFor="address">Shipping Address</Label>
                <Textarea
                  id="address"
                  placeholder="123 Main st. City, State"
                  className="w-full h-[175px] mt-2"
                />
                <Button className="w-full">Place Order</Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
