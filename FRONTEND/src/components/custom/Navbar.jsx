import React, { useState } from "react";
import { Link } from "react-router-dom";
import ModeToggle from "./ModeToggle";
import CartDrawer from "./CartDrawer";
import { User } from "lucide-react";
import LogoutToggle from "./LogoutToggle";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <nav className="flex justify-between items-center px-8 py-5 border-b dark:bg-zinc-900">
      {/* icons */}
      <Link to="/" className="text-2xl font-bold">
        NeoMart
      </Link>
      <div className="flex gap-4 items-center">
        {isAuthenticated && <CartDrawer></CartDrawer>}
        {isAuthenticated ? (
          <LogoutToggle />
        ) : (
          <Link to="/login">
            <User
              strokeWidth={1.3}
              className="text-gray-800 dark:text-white cursor-pointer hover:scale-105 transition-all transition-ease-in-out"
            ></User>
          </Link>
        )}
        <ModeToggle></ModeToggle>
      </div>
    </nav>
  );
};

export default Navbar;
