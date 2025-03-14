import React from "react";
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
  const dispatch = useDispatch();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className={`cursor-pointer`}>
          {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
          <AvatarFallback>{user?.name?.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <Link to="/orders">
          <DropdownMenuItem>My Orders</DropdownMenuItem>
        </Link>
        <DropdownMenuItem onClick={() => dispatch(setUserLogout())}>
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LogoutToggle;
