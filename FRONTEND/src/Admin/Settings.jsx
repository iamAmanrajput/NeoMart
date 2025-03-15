import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useErrorLogout from "../hooks/use-error-logout";
import { toast } from "sonner";
import axios from "axios";
import Loader from "@/components/custom/Loader";

const Settings = () => {
  const { handleErrorLogout } = useErrorLogout();
  const [userloading, setUserLoading] = useState(false);
  const [passloading, setPassLoading] = useState(false);

  // Change Username Function
  const changeUsername = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const previousUsername = formData.get("previousUsername");
    const newUsername = formData.get("newUsername");

    if (!newUsername) {
      toast.error("Username to change is Required");
      return;
    }

    try {
      setUserLoading(true); // Start loading
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/setting/update-username`,
        { previousUsername, newUsername },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      const data = response.data;
      if (data.success) {
        localStorage.setItem("user", JSON.stringify(data.user));
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
      e.target.reset();
    } catch (error) {
      handleErrorLogout(error);
    } finally {
      setUserLoading(false); // Stop loading
    }
  };

  // Change Password Function
  const changePassword = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const previousPassword = formData.get("previousPassword");
    const newPassword = formData.get("newPassword");

    if (!newPassword || !previousPassword) {
      toast.error("Password to change is Required");
      return;
    }

    try {
      setPassLoading(true); // Start loading
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/setting/update-password`,
        {
          username: JSON.parse(localStorage.getItem("user")).username,
          previousPassword,
          newPassword,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      const data = response.data;
      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
      e.target.reset();
    } catch (error) {
      handleErrorLogout(error);
    } finally {
      setPassLoading(false); // Stop loading
    }
  };

  return (
    <div className="flex flex-col sm:flex-row justify-center items-center gap-3 w-screen sm:w-[70vw] 2xl:w-[80vw] sm:justify-start">
      {/* Change Username */}
      <div>
        <h2 className="text-2xl mb-3 font-bold">Change Username</h2>
        <form
          onSubmit={changeUsername}
          className="grid gap-3 w-[80vw] sm:w-[30vw]"
        >
          <Input
            type="text"
            placeholder="Enter Previous Username"
            name="previousUsername"
          />
          <Input
            type="text"
            placeholder="Enter new Username"
            name="newUsername"
          />
          <Button
            type="submit"
            className="cursor-pointer"
            disabled={userloading}
          >
            {userloading ? <Loader /> : "Change Username"}
          </Button>
        </form>
      </div>

      {/* Change Password */}
      <div>
        <h2 className="text-2xl mb-3 font-bold">Change Password</h2>
        <form
          onSubmit={changePassword} // Fixed from `onClick`
          className="grid gap-3 w-[80vw] sm:w-[30vw]"
        >
          <Input
            type="password"
            placeholder="Enter Previous Password"
            name="previousPassword"
          />
          <Input
            type="password"
            placeholder="Enter new Password"
            name="newPassword"
          />
          <Button
            type="submit"
            className="cursor-pointer"
            disabled={passloading}
          >
            {passloading ? <Loader /> : "Change Password"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Settings;
