import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Loader from "@/components/custom/Loader";
import { toast } from "sonner";
import axios from "axios";
import { setUserLogin } from "@/redux/slices/authSlice"; // Import Redux action

const AdminLogin = () => {
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
      const { username, password } = e.target.elements;
      if (!username.value.trim() || !password.value.trim()) {
        toast.error("All Fields are Required");
        setErrorMsg("All Fields are Required");
        setLoading(false);
        return;
      }

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/admin/login`,
        {
          username: username.value.trim(),
          password: password.value,
        }
      );

      const data = res.data;
      if (data.success) {
        dispatch(setUserLogin(data)); // Dispatch action to update Redux state
        toast.success(data.message);
        navigate("/admin/dashboard"); // Navigate only after successful dispatch
      } else {
        toast.error(data.message);
        setErrorMsg(data.message);
      }
    } catch (error) {
      console.log(error);
      const errorMessage =
        error.response?.data?.message ||
        "Something went wrong! Please try again.";
      setErrorMsg(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center sm:items-center sm:min-h-screen mt-10 sm:mt-0 bg-gray-100 dark:bg-black text-black dark:text-white">
      <div className="w-96 p-6 bg-white dark:bg-[#000000] dark:border-gray-700 dark:border rounded-lg shadow-2xl">
        <h2 className="text-2xl font-bold text-center mb-6">Login as Admin</h2>
        {errorMsg && (
          <div className="text-red-500 text-sm font-semibold mb-4 text-center">
            {errorMsg}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Label htmlFor="username" className="block mb-2">
              Username
            </Label>
            <Input
              type="text"
              id="username"
              name="username"
              placeholder="Enter Your Username"
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
            <Checkbox
              id="terms"
              checked={isChecked}
              onCheckedChange={(value) => setIsChecked(!!value)}
            />
            <Label htmlFor="terms">Remember me</Label>
          </div>
          <Button
            type="submit"
            className="w-full cursor-pointer"
            disabled={!isChecked}
          >
            {loading ? <Loader /> : "Login"}
          </Button>
        </form>
        {/* <p className="text-center text-gray-400 mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-400">
            Sign Up
          </Link>
        </p> */}
      </div>
    </div>
  );
};

export default AdminLogin;
