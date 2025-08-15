import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ModeToggle from "./ModeToggle";
import CartDrawer from "./CartDrawer";
import { User } from "lucide-react";
import LogoutToggle from "./LogoutToggle";
import { useSelector } from "react-redux";
import { Button } from "../ui/button";

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  return (
    <nav className="flex justify-between items-center px-8 py-5 border-b dark:bg-zinc-900">
      {/* icons */}
      <Link to="/" className="text-2xl font-bold">
        NeoMart
      </Link>
      <div className="flex gap-3 items-center">
        <ModeToggle></ModeToggle>
        {isAuthenticated && <CartDrawer></CartDrawer>}
        {isAuthenticated ? (
          <LogoutToggle user={user} />
        ) : (
          <Button
            onClick={() => navigate("/login")}
            variant="outline"
            className="relative"
            size="icon"
          >
            <User className="size-4 text-zinc-600 dark:text-zinc-300 cursor-pointer"></User>
          </Button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
