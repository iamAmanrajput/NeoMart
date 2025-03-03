import React from "react";
import Navbar from "@/components/custom/Navbar";
import Footer from "@/components/custom/Footer";
import CheckoutProduct from "@/components/custom/CheckoutProduct";

const Checkout = () => {
  return (
    <div>
      <Navbar></Navbar>
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
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Checkout;
