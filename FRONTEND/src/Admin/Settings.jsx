import React from "react";
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
      const response = await axios.put(
        `${import.meta.env}/setting/update-username`,
        { previousUsername, newUsername },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      const data = response.data;
      if (data.success) {
        localStorage.setItem("user", JSON.stringify(data.user));
        toast(data.message);
      } else {
        toast.error(data.message);
      }
      e.target.reset();
    } catch (error) {
      return handleErrorLogout(error);
    }
  };

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
      const response = await axios.put(
        `${import.meta.env}/setting/update-password`,
        { previousPassword, newPassword },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      const data = response.data;
      if (data.success) {
        toast(data.message);
      } else {
        toast(data.message);
      }
      e.target.reset();
    } catch (error) {
      return handleErrorLogout(error);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row justify-center items-center gap-3 w-screen sm:w-[70vw] 2xl:w-[80vw] sm:justify-start">
      {/* change username */}
      <div>
        <h2 className="text-2xl mb-3 font-bold">Change Username</h2>
        <form
          onSubmit={changeUsername}
          className="grid gap-3 w-[80vw] sm:w-[30vw]"
        >
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
          <Button type="submit">
            {userloading ? <Loader /> : "Change Username"}
          </Button>
        </form>
      </div>

      {/* change password */}
      <div>
        <h2 className="text-2xl mb-3 font-bold">Change Password</h2>
        <form
          onClick={changePassword}
          className="grid gap-3 w-[80vw] sm:w-[30vw]"
        >
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
          <Button type="submit">
            {passloading ? <Loader /> : "Change Password"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Settings;
