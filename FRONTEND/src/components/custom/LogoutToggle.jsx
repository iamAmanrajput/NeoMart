import React, { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserLogout } from "@/redux/slices/authSlice";

const LogoutToggle = ({ user }) => {
  const [image, setImage] = useState("");
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      const { profileImg } = userData;
      setImage(profileImg);
    }
  }, []);
  const dispatch = useDispatch();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className={`cursor-pointer `}>
          <AvatarImage className="bg-[#27272A]" src={image} />
          {/* <AvatarFallback>{user?.name?.charAt(0).toUpperCase()}</AvatarFallback> */}
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <Link to="/orders">
          <DropdownMenuItem className="cursor-pointer">
            My Orders
          </DropdownMenuItem>
        </Link>
        <Link to="/profile">
          <DropdownMenuItem className="cursor-pointer">
            My Profile
          </DropdownMenuItem>
        </Link>
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => dispatch(setUserLogout())}
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LogoutToggle;
