import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
  exit: { opacity: 0, scale: 0.95, y: 30, transition: { duration: 0.3 } },
};

const buttonVariants = {
  hover: { scale: 1.05, boxShadow: "0 0 8px rgba(59, 130, 246, 0.6)" },
  tap: { scale: 0.95 },
};

const Error = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen text-center bg-gray-100 dark:bg-black p-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div
        className="text-red-500 w-20 h-20 mb-5"
        animate={{ rotate: [0, 10, -10, 10, -10, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
      >
        <AlertTriangle className="w-full h-full" />
      </motion.div>

      <h1 className="text-4xl font-extrabold text-gray-900 dark:text-customIsabelline mb-2">
        Oops! Something went wrong.
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-6">
        The page you are looking for does not exist or an unexpected error
        occurred.
      </p>

      <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
        <Button
          className="px-8 py-3 text-lg font-semibold cursor-pointer"
          onClick={() => navigate("/")}
          aria-label="Go to Home"
        >
          Go Home
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default Error;
