import React, { useState } from "react";
import CheckoutProduct from "@/components/custom/CheckoutProduct";
import { Card } from "@/components/ui/card";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useErrorLogout from "@/hooks/use-error-logout";
import useRazorpay from "@/hooks/use-razorpay";
import { toast } from "sonner";
import { emptyCart } from "@/redux/slices/cartSlice";
import { motion } from "framer-motion";

const Checkout = () => {
  const [address, setAddress] = useState("");
  const { cartItems, totalQuantity, totalPrice } = useSelector(
    (state) => state.cart
  );
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { handleErrorLogout } = useErrorLogout();
  const { generatePayment, verifyPayment } = useRazorpay();

  const handleCheckout = async () => {
    if (address.trim() === "") {
      toast.error("Please enter Your Address");
      return;
    }
    const productArray = cartItems.map((item) => ({
      id: item._id,
      quantity: item.quantity,
      color: item.color,
    }));
    try {
      const options = await generatePayment(totalPrice);
      await verifyPayment(options, productArray, address);
      dispatch(emptyCart());
      // Optional: Navigate to success page or show success toast
    } catch (error) {
      handleErrorLogout(error);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 my-12">
      <motion.div
        className="flex flex-col sm:flex-row gap-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Product Details */}
        <section className="flex-1 space-y-6">
          <h2 className="text-2xl font-semibold border-b pb-3 mb-4">
            Order Summary
          </h2>

          {cartItems.length === 0 ? (
            <p className="text-center text-primary text-xl py-20">
              Nothing to Show, Please add some Products
            </p>
          ) : (
            <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
              {cartItems.map((item) => (
                <CheckoutProduct key={item._id} {...item} />
              ))}
            </div>
          )}

          <div className="border-t pt-4 space-y-3 text-lg">
            <div className="flex justify-between">
              <span className="font-semibold text-customGray">Subtotal:</span>
              <span className="font-bold">₹ {totalPrice.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-customGray">Tax:</span>
              <span className="font-bold">₹0</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-customGray">Shipping:</span>
              <span className="font-bold">₹0</span>
            </div>
            <div className="flex justify-between border-t pt-3 font-bold text-xl">
              <span>Total:</span>
              <span>₹ {totalPrice.toLocaleString()}</span>
            </div>
          </div>
        </section>

        {/* Billing Info */}
        <section className="w-full max-w-sm">
          <Card className="p-6 shadow-lg">
            <h2 className="text-2xl font-semibold mb-6">Billing Information</h2>
            <form
              className="space-y-5"
              onSubmit={(e) => {
                e.preventDefault();
                handleCheckout();
              }}
            >
              <div>
                <Label htmlFor="name" className="mb-1 block font-medium">
                  Full Name
                </Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  value={user?.name || ""}
                  disabled
                  className="bg-gray-100 cursor-not-allowed"
                />
              </div>
              <div>
                <Label htmlFor="email" className="mb-1 block font-medium">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={user?.email || ""}
                  disabled
                  className="bg-gray-100 cursor-not-allowed"
                />
              </div>
              <div>
                <Label htmlFor="address" className="mb-1 block font-medium">
                  Shipping Address
                </Label>
                <Textarea
                  id="address"
                  placeholder="123 Main St, City, State"
                  className="resize-none"
                  rows={6}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={cartItems.length === 0}
              >
                Place Order
              </Button>
            </form>
          </Card>
        </section>
      </motion.div>
    </div>
  );
};

export default Checkout;
