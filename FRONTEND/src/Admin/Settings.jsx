import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Settings = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-center items-center gap-3 w-screen sm:w-[70vw] 2xl:w-[80vw] sm:justify-start">
      {/* change username */}
      <div>
        <h2 className="text-2xl mb-3 font-bold">Change Username</h2>
        <form className="grid gap-3 w-[80vw] sm:w-[30vw]">
          <Input
            type="text"
            className=""
            placeholder="Enter Previous Username"
            name="previousUsername"
          />
          <Input
            type="text"
            className=""
            placeholder="Enter new Username"
            name="newUsername"
          />
          <Button type="submit">Change Username</Button>
        </form>
      </div>

      {/* change password */}
      <div>
        <h2 className="text-2xl mb-3 font-bold">Change Password</h2>
        <form className="grid gap-3 w-[80vw] sm:w-[30vw]">
          <Input
            type="password"
            className=""
            placeholder="Enter Previous Password"
            name="previousPassword"
          />
          <Input
            type="password"
            className=""
            placeholder="Enter new Password"
            name="newPassword"
          />
          <Button type="submit">Change Password</Button>
        </form>
      </div>
    </div>
  );
};

export default Settings;
