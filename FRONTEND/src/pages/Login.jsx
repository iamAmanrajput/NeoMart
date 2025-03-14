import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserLogin } from "@/redux/slices/authSlice";
import { toast } from "sonner";
import Loader from "@/components/custom/Loader";

const Login = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);
    try {
      const { email, password } = e.target.elements;
      if (!email.value.trim() || !password.value.trim()) {
        toast.error("All Fields are Required");
        setErrorMsg("All Fields are Required");
        setLoading(false);
        return;
      }

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/login`,
        {
          email: email.value.toLowerCase().trim(),
          password: password.value,
        }
      );

      const data = res.data;
      if (data.success) {
        dispatch(setUserLogin(data));
        toast.success(data.message);
        navigate("/");
      } else {
        toast.error(data.message);
        setErrorMsg(data.message);
      }
    } catch (error) {
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
    <div>
      <div className="flex justify-center sm:items-center sm:min-h-screen mt-10 sm:mt-0 bg-gray-100 dark:bg-black text-black dark:text-white">
        <div className="w-96 p-6 bg-white dark:bg-[#000000] dark:border-gray-700 dark:border rounded-lg shadow-2xl">
          <h2 className="text-2xl font-bold text-center mb-6">
            Login to your account
          </h2>

          {/* 🔥 Error Message */}
          {errorMsg && (
            <div className="text-red-500 text-sm font-semibold mb-4 text-center">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <Label htmlFor="emai" className="mb-2">
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
              <Label htmlFor="password" className="mb-2">
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
              <Label htmlFor="terms">Remember me</Label>
            </div>
            <Button
              className="w-full cursor-pointer"
              disabled={!isChecked || loading}
            >
              {loading ? <Loader /> : "Login"}
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

export default Login;
