import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "@/components/custom/Loader";
import { toast } from "sonner";
import axios from "axios";

const Signup = () => {
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, phone, password } = e.target.elements;
    if (
      name.value.trim() == "" ||
      email.value.trim() == "" ||
      phone.value.trim() == "" ||
      password.value.trim() == ""
    ) {
      toast("Please fill all the fields", {
        style: {
          background: "#ff4d4d", // Red Background
          color: "#fff", // White Text
        },
      });
    }
    try {
      const res = await axios.post(`${import.meta.envVITE_API_URL}/signup`, {
        name: name.value,
        phone: phone.value,
        email: email.value,
        password: password.value,
      });
      const data = res.data;
      if (data.success) {
        toast(data.message);
        navigate("/login");
      } else {
        toast(data.message);
      }
    } catch (error) {
      toast(error.data.response.message, {
        style: {
          background: "#ff4d4d", // Red Background
          color: "#fff", // White Text
        },
      });
    }
  };

  return (
    <div>
      <div className="flex justify-center sm:items-center sm:min-h-screen mt-10 sm:mt-0 bg-gray-100 dark:bg-black text-black dark:text-white">
        <div className="w-96 p-6 bg-white dark:bg-[#000000] dark:border-gray-700 dark:border rounded-lg shadow-2xl">
          <h2 className="text-2xl font-bold text-center mb-6">
            Register your account
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <Label htmlFor="name" className="block mb-2">
                Name
              </Label>
              <Input
                type="text"
                id="name"
                name="name"
                placeholder="Enter Your Name"
                className="bg-gray-100 dark:bg-zinc-900 text-black dark:text-white border border-gray-700 focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="email" className="block mb-2">
                Email
              </Label>
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="Enter Your Email"
                className="bg-gray-100 dark:bg-zinc-900 text-black dark:text-white border border-gray-700 focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="phone" className="block mb-2">
                Phone
              </Label>
              <Input
                type="tel"
                id="phone"
                name="phone"
                placeholder="Enter Your Phone"
                className="bg-gray-100 dark:bg-zinc-900 text-black dark:text-white border border-gray-700 focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="password" className="block mb-2">
                Password
              </Label>
              <Input
                type="password"
                id="password"
                name="password"
                placeholder="Enter Your Password"
                className="bg-gray-100 dark:bg-zinc-900 text-black dark:text-white border border-gray-700 focus:border-blue-500"
              />
            </div>
            <div className="flex items-center gap-2 mb-4">
              <Checkbox id="terms" onCheckedChange={setIsChecked} />
              <Label htmlFor="terms">Accept terms and conditions</Label>
            </div>
            <Button className="w-full cursor-pointer" disabled={!isChecked}>
              {loading ? <Loader /> : "Signup"}
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
    </div>
  );
};

export default Signup;
