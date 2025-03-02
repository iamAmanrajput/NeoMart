import React from "react";
import Navbar from "@/components/custom/Navbar";
import Footer from "@/components/custom/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <div>
      <Navbar></Navbar>
      <div className="flex justify-center sm:items-center sm:min-h-screen mt-10 sm:mt-0 bg-gray-100 dark:bg-black text-black dark:text-white">
        <div className="w-96 p-6 bg-white dark:bg-[#000000] dark:border-gray-700 dark:border rounded-lg shadow-2xl">
          <h2 className="text-2xl font-bold text-center mb-6">
            Register your account
          </h2>
          <form>
            <div className="mb-4">
              <Label className="block mb-2">Name</Label>
              <Input
                type="text"
                required
                placeholder="Enter Your Name"
                className="bg-gray-100 dark:bg-zinc-900 text-black dark:text-white border border-gray-700 focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <Label className="block mb-2">Email</Label>
              <Input
                type="email"
                required
                placeholder="Enter Your Email"
                className="bg-gray-100 dark:bg-zinc-900 text-black dark:text-white border border-gray-700 focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <Label className="block mb-2">Phone</Label>
              <Input
                type="tel"
                required
                placeholder="Enter Your Phone"
                className="bg-gray-100 dark:bg-zinc-900 text-black dark:text-white border border-gray-700 focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <Label className="block mb-2">Password</Label>
              <Input
                type="password"
                required
                placeholder="Enter Your Password"
                className="bg-gray-100 dark:bg-zinc-900 text-black dark:text-white border border-gray-700 focus:border-blue-500"
              />
            </div>
            <div className="flex items-center gap-2 mb-4">
              <Checkbox id="terms" onCheckedChange={setIsChecked} />
              <Label htmlFor="terms">Accept terms and conditions</Label>
            </div>
            <Button className="w-full cursor-pointer" disabled={!isChecked}>
              Sign Up
            </Button>
          </form>
          <p className="text-center text-gray-400 mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-400">
              Login
            </Link>
          </p>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Signup;
