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
import { useDispatch } from "react-redux";
import { setUserLogout } from "@/redux/slices/authSlice";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import axios from "axios";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Loader from "@/components/custom/Loader";

const MyProfile = () => {
  const [user, setUser] = useState({});
  const [image, setImage] = useState("");
  const [isProfileEditModelOpen, setIsProfileEditModelOpen] = useState(false);
  const [isEditPasswordOpen, setIsEditPasswordOpen] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);
  const dispatch = useDispatch();
  const [profileFormdata, setProfileFormdata] = useState({
    name: "",
    email: "",
    phone: "",
    image: "",
  });
  const [passwordFormdata, setPasswordFormdata] = useState({
    previousPassword: "",
    newPassword: "",
  });

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      setUser(userData);
    }
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      setProfileFormdata({ ...profileFormdata, image: file });
    }
  };

  const handleEditProfile = (user) => {
    setProfileFormdata({
      name: user.name || "",
      email: user.email || "",
      phone: user.phone || "",
      image: "",
    });
    setImage(user.profileImg || "");
    setIsProfileEditModelOpen(true);
  };

  const handleEditPassword = () => {
    setIsEditPasswordOpen(true);
  };

  const handleProfileChange = (e) => {
    setProfileFormdata({ ...profileFormdata, [e.target.name]: e.target.value });
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setProfileLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", profileFormdata.name);
      formData.append("email", profileFormdata.email);
      formData.append("phone", profileFormdata.phone);
      if (profileFormdata.image) {
        formData.append("image", profileFormdata.image);
      }

      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/profile/update-profile`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (res.data.success) {
        toast("Profile Updated Successfully");
        localStorage.setItem("user", JSON.stringify(res.data.user));
        setUser(res.data.user);
        setProfileFormdata({
          name: "",
          email: "",
          phone: "",
          image: "",
        });
        setImage("");
        setIsProfileEditModelOpen(false);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setProfileLoading(false);
    }
  };

  const handleEditPasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordLoading(true);
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/profile/update-password`,
        passwordFormdata,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (res.data.success) {
        toast("Password Updated Successfully");
        setPasswordFormdata({
          previousPassword: "",
          newPassword: "",
        });
        setIsEditPasswordOpen(false);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 my-10">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl">My Profile</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <Avatar className="h-20 w-20">
              <AvatarImage src={user?.profileImg || "/default-avatar.png"} />
              <AvatarFallback>U</AvatarFallback>
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
          <Button
            className="w-full sm:w-auto cursor-pointer"
            onClick={() => handleEditProfile(user)}
          >
            Update Profile
          </Button>
          {/* update profile */}
          <Dialog
            open={isProfileEditModelOpen}
            onOpenChange={setIsProfileEditModelOpen}
          >
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Update Profile</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleUpdateProfile}>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <label htmlFor="name" className="font-medium">
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={profileFormdata.name}
                      onChange={handleProfileChange}
                      className="border rounded-md px-3 py-2"
                    />
                  </div>

                  <div className="grid gap-2">
                    <label htmlFor="email" className="font-medium">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={profileFormdata.email}
                      onChange={handleProfileChange}
                      className="border rounded-md px-3 py-2"
                    />
                  </div>

                  <div className="grid gap-2">
                    <label htmlFor="phone" className="font-medium">
                      Phone
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="text"
                      value={profileFormdata.phone}
                      onChange={handleProfileChange}
                      className="border rounded-md px-3 py-2"
                    />
                  </div>

                  <div className="grid gap-2">
                    <label htmlFor="imageUpload" className="font-medium">
                      Upload Profile Image
                    </label>
                    <input
                      type="file"
                      id="imageUpload"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    <label
                      htmlFor="imageUpload"
                      className="cursor-pointer border-dashed border-2 border-gray-300 rounded-md p-4 text-center text-gray-500 hover:border-blue-500 transition"
                    >
                      Click to upload image
                    </label>

                    {image && (
                      <div className="mt-2">
                        <img
                          src={image}
                          alt="Profile Preview"
                          className="w-24 h-24 object-cover rounded-full mx-auto"
                        />
                      </div>
                    )}
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">
                    {profileLoading ? <Loader /> : "Save Changes"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>

          <Button
            onClick={handleEditPassword}
            className="w-full sm:w-auto cursor-pointer"
          >
            Update Password
          </Button>

          {/* update password */}
          <Dialog
            open={isEditPasswordOpen}
            onOpenChange={setIsEditPasswordOpen}
          >
            <DialogContent className="sm-max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit Product</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleEditPasswordSubmit}>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-4 items-center">
                    <Label htmlFor="previousPassword">Old Password</Label>
                    <Input
                      id="previousPassword"
                      name="previousPassword"
                      type="password"
                      value={passwordFormdata.previousPassword}
                      onChange={(e) =>
                        setPasswordFormdata({
                          ...passwordFormdata,
                          previousPassword: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="grid gap-4 items-center">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input
                      id="newPassword"
                      name="newPassword"
                      type="password"
                      value={passwordFormdata.newPassword}
                      onChange={(e) =>
                        setPasswordFormdata({
                          ...passwordFormdata,
                          newPassword: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">
                    {passwordLoading ? <Loader /> : "Save Changes"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>

          <Button
            variant="destructive"
            className="w-full sm:w-auto cursor-pointer"
            onClick={() => dispatch(setUserLogout())}
          >
            Logout
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default MyProfile;
