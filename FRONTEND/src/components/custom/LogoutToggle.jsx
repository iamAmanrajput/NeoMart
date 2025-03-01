import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";

const LogoutToggle = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className={`cursor-pointer`}>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>RP</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <Link to="/orders">
          <DropdownMenuItem>My Orders</DropdownMenuItem>
        </Link>
        <DropdownMenuItem>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LogoutToggle;
