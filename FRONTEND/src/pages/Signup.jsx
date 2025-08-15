import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Link, useNavigate } from "react-router-dom";
import Loader from "@/components/custom/Loader";
import { toast } from "sonner";
import axios from "axios";
import { motion } from "framer-motion";

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
    <div className="relative min-h-screen flex items-center justify-center bg-gray-100 dark:bg-black">
      {/* Animated Grid Background */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      />

      {/* Signup Card */}
      <motion.div
        className="relative z-10 w-full max-w-md mx-auto p-8 rounded-xl shadow-xl bg-white dark:bg-zinc-900 border dark:border-zinc-800"
        initial={{ opacity: 0, scale: 0.97, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <h2 className="text-3xl font-bold text-center mb-7 tracking-tight">
          Register your account
        </h2>

        {/* Error Message */}
        {errorMsg && (
          <motion.div
            className="text-red-500 text-sm font-semibold mb-5 text-center"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {errorMsg}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <Label className="mb-2" htmlFor="name">
              Name
            </Label>
            <Input
              type="text"
              id="name"
              name="name"
              placeholder="Enter Your Name"
            />
          </div>
          <div>
            <Label className="mb-2" htmlFor="email">
              Email
            </Label>
            <Input
              type="email"
              id="email"
              name="email"
              placeholder="Enter Your Email"
            />
          </div>
          <div>
            <Label className="mb-2" htmlFor="phone">
              Phone
            </Label>
            <Input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Enter Your Phone"
            />
          </div>
          <div>
            <Label className="mb-2" htmlFor="password">
              Password
            </Label>
            <Input
              type="password"
              id="password"
              name="password"
              placeholder="Enter Your Password"
            />
          </div>
          <motion.div
            className="flex items-center gap-3 mb-3"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Checkbox
              id="terms"
              checked={isChecked}
              onCheckedChange={setIsChecked}
            />
            <Label htmlFor="terms">Accept terms and conditions</Label>
          </motion.div>

          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Button
              type="submit"
              className="w-full font-semibold text-lg"
              disabled={!isChecked || loading}
            >
              {loading ? <Loader /> : "Signup"}
            </Button>
          </motion.div>
        </form>

        <motion.p
          className="text-center text-gray-400 mt-7"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.6 }}
        >
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-500 hover:underline font-medium"
          >
            Login
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Signup;
