import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const Success = () => {
  const navigate = useNavigate();
  const [count, setCount] = useState(3);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prev) => prev - 1);
    }, 1000);

    const redirectTimer = setTimeout(() => {
      navigate("/"); // Redirect to home after 3 seconds
    }, 3000);

    return () => {
      clearInterval(timer);
      clearTimeout(redirectTimer);
    };
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center bg-gray-100 dark:bg-black p-6">
      <CheckCircle className="text-green-500 w-16 h-16 mb-4" />
      <h1 className="text-4xl font-bold text-green-800 dark:text-white">
        Payment Successful!
      </h1>
      <p className="text-lg text-green-600 dark:text-gray-300 mt-2">
        Redirecting to Home in {count} seconds...
      </p>
    </div>
  );
};

export default Success;
