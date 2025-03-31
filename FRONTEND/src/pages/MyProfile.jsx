import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const MyProfile = () => {
  const [user, setUser] = useState({});
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      setUser(userData);
    }
  }, []);
  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 my-10">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl">My Profile</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <Avatar className="h-20 w-20">
              <AvatarImage src={user.profileImg} />
            </Avatar>

            <div className="text-center sm:text-left">
              <h1 className="text-lg sm:text-xl font-semibold capitalize">
                {user.name}
              </h1>
              <h3 className="text-sm sm:text-base text-muted-foreground">
                {user.email}
              </h3>
              <h3 className="text-sm sm:text-base text-muted-foreground">
                +91 {user.phone}
              </h3>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col sm:flex-row gap-4 sm:justify-start items-center sm:items-start">
          <Button className="w-full sm:w-auto">Update Profile</Button>
          <Button className="w-full sm:w-auto">Update Password</Button>
          <Button
            variant="destructive"
            className="w-full sm:w-auto cursor-pointer"
          >
            Logout
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default MyProfile;
