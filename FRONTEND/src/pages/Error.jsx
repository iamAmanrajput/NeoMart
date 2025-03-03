import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

const Error = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center bg-gray-100 dark:bg-black p-6">
      <AlertTriangle className="text-red-500 w-16 h-16 mb-4" />
      <h1 className="text-4xl font-bold text-gray-800 dark:text-customIsabelline ">
        Oops! Something went wrong.
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
        The page you are looking for does not exist.
      </p>
      <Button
        className="mt-6 px-6 py-3 text-lg cursor-pointer"
        onClick={() => navigate("/")}
      >
        Go Home
      </Button>
    </div>
  );
};

export default Error;
