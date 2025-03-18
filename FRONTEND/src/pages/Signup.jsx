import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Link, useNavigate } from "react-router-dom";
import Loader from "@/components/custom/Loader";
import { toast } from "sonner";
import axios from "axios";

const Signup = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    const { name, email, phone, password } = e.target.elements;

    // 🔹 Check empty fields
    if (
      !name.value.trim() ||
      !email.value.trim() ||
      !phone.value.trim() ||
      !password.value.trim()
    ) {
      setErrorMsg("Please fill all the fields.");
      toast.error("Please fill all the fields.");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/signup`,
        {
          name: name.value.trim(),
          phone: phone.value.trim(),
          email: email.value.trim(),
          password: password.value,
        }
      );

      const data = res.data;

      if (data.success) {
        toast.success(data.message);
        navigate("/login");
      } else {
        setErrorMsg(data.message);
        toast.error(data.message);
      }
    } catch (error) {
      // 🔹 Proper error handling
      if (error.response?.data?.message) {
        setErrorMsg(error.response.data.message);
        toast.error(error.response.data.message);
      } else {
        setErrorMsg("Something went wrong! Please try again.");
        toast.error("Something went wrong! Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center sm:items-center sm:min-h-screen mt-10 sm:mt-0 bg-gray-100 dark:bg-black text-black dark:text-white">
      <div className="w-96 p-6 bg-white dark:bg-[#000000] dark:border-gray-700 dark:border rounded-lg shadow-2xl">
        <h2 className="text-2xl font-bold text-center mb-4">
          Register your account
        </h2>

        {/* 🔹 Error Message */}
        {errorMsg && (
          <div className="text-red-500 text-sm font-semibold mb-4 text-center">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Label htmlFor="name">Name</Label>
            <Input
              type="text"
              id="name"
              name="name"
              placeholder="Enter Your Name"
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="email" className="mb-2">
              Email
            </Label>
            <Input
              type="email"
              id="email"
              name="email"
              placeholder="Enter Your Email"
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="phone" className="mb-2">
              Phone
            </Label>
            <Input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Enter Your Phone"
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="password" className="mb-2">
              Password
            </Label>
            <Input
              type="password"
              id="password"
              name="password"
              placeholder="Enter Your Password"
            />
          </div>
          <div className="flex items-center gap-2 mb-4">
            <Checkbox id="terms" onCheckedChange={setIsChecked} />
            <Label htmlFor="terms">Accept terms and conditions</Label>
          </div>

          {/* 🔹 Signup Button with Loader */}
          <Button
            className="w-full cursor-pointer"
            disabled={!isChecked || loading}
          >
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
  );
};

export default Signup;
