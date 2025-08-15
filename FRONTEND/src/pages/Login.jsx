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
import { motion } from "framer-motion";

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
      <motion.div
        className="flex justify-center sm:items-center sm:min-h-screen mt-10 sm:mt-0 bg-gray-100 dark:bg-black text-black dark:text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 80, damping: 12 }}
          whileHover={{ scale: 1.02 }}
          className="w-96 p-6 bg-white dark:bg-zinc-900 dark:border rounded-lg shadow-2xl"
        >
          <motion.h2
            className="text-2xl font-bold text-center mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Login to your account
          </motion.h2>

          {/*  Error Message */}
          {errorMsg && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 text-sm font-semibold mb-4 text-center"
            >
              {errorMsg}
            </motion.div>
          )}

          <form onSubmit={handleSubmit}>
            <motion.div
              className="mb-4"
              whileFocus={{ scale: 1.01 }}
              transition={{ duration: 0.3 }}
            >
              <Label htmlFor="email" className="mb-2">
                Email
              </Label>
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="Enter Your Email"
                className="transition-all duration-300 ease-in-out "
              />
            </motion.div>

            <motion.div className="mb-4">
              <Label htmlFor="password" className="mb-2">
                Password
              </Label>
              <Input
                type="password"
                id="password"
                name="password"
                placeholder="Enter Your Password"
                className="transition-all duration-300 ease-in-out"
              />
            </motion.div>

            <div className="flex items-center gap-2 mb-4">
              <Checkbox id="terms" onCheckedChange={setIsChecked} />
              <Label htmlFor="terms">Remember me</Label>
            </div>

            <motion.div whileTap={{ scale: 0.97 }}>
              <Button
                className="w-full cursor-pointer transition-all duration-300 hover:scale-[1.02]"
                disabled={!isChecked || loading}
              >
                {loading ? <Loader /> : "Login"}
              </Button>
            </motion.div>
          </form>

          <motion.p
            className="text-center text-gray-400 mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-400 hover:underline">
              Sign Up
            </Link>
          </motion.p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
