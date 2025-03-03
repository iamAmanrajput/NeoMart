import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "react-router-dom";

const AdminLogin = () => {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <div>
      <div className="flex justify-center sm:items-center sm:min-h-screen mt-10 sm:mt-0 bg-gray-100 dark:bg-black text-black dark:text-white">
        <div className="w-96 p-6 bg-white dark:bg-[#000000] dark:border-gray-700 dark:border rounded-lg shadow-2xl">
          <h2 className="text-2xl font-bold text-center mb-6">
            Login as Admin
          </h2>
          <form>
            <div className="mb-4">
              <Label className="block mb-2">Username</Label>
              <Input
                type="text"
                required
                placeholder="Enter Your Username"
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
              <Label htmlFor="terms">Remember me</Label>
            </div>
            <Button className="w-full cursor-pointer" disabled={!isChecked}>
              Login
            </Button>
          </form>
          <p className="text-center text-gray-400 mt-4">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-400">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
