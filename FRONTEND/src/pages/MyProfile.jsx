import React, { useEffect, useState } from "react";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
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
import { motion } from "framer-motion";

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
        toast.success("Profile Updated Successfully");
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
        toast.success("Password Updated Successfully");
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
    <motion.div
      className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 my-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="shadow-lg bg-white dark:bg-zinc-900 border border-border/50">
        <CardHeader className="flex flex-col items-center sm:flex-row sm:items-start gap-6">
          <motion.div whileHover={{ scale: 1.05 }} className="relative">
            <Avatar className="h-24 w-24 ring-4 ring-primary/20">
              <AvatarImage src={user?.profileImg || "/default-avatar.png"} />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </motion.div>
          <div>
            <CardTitle className="text-2xl font-bold capitalize">
              {user.name}
            </CardTitle>
            <p className="text-muted-foreground">{user.email}</p>
            <p className="text-muted-foreground">+91 {user.phone}</p>
          </div>
        </CardHeader>

        <CardFooter className="flex flex-wrap gap-4 justify-center sm:justify-start px-6 pb-6">
          <motion.div whileTap={{ scale: 0.95 }}>
            <Button onClick={() => handleEditProfile(user)}>
              Update Profile
            </Button>
          </motion.div>
          <motion.div whileTap={{ scale: 0.95 }}>
            <Button onClick={handleEditPassword}>Update Password</Button>
          </motion.div>
          <motion.div whileTap={{ scale: 0.95 }}>
            <Button
              variant="destructive"
              onClick={() => dispatch(setUserLogout())}
            >
              Logout
            </Button>
          </motion.div>
        </CardFooter>
      </Card>

      {/* Update Profile Dialog */}
      <Dialog
        open={isProfileEditModelOpen}
        onOpenChange={setIsProfileEditModelOpen}
      >
        <DialogContent>
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <DialogHeader className="mb-3">
              <DialogTitle>Update Profile</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div className="grid gap-2">
                <Label>Name</Label>
                <Input
                  name="name"
                  value={profileFormdata.name}
                  onChange={handleProfileChange}
                />
              </div>
              <div className="grid gap-2">
                <Label>Email</Label>
                <Input
                  type="email"
                  name="email"
                  value={profileFormdata.email}
                  onChange={handleProfileChange}
                />
              </div>
              <div className="grid gap-2">
                <Label>Phone</Label>
                <Input
                  name="phone"
                  value={profileFormdata.phone}
                  onChange={handleProfileChange}
                />
              </div>
              <div className="grid gap-2">
                <Label>Upload Image</Label>
                <label
                  htmlFor="imageUpload"
                  className="cursor-pointer border-dashed border-2 rounded-md p-4 text-center hover:border-primary transition"
                >
                  Click to upload image
                </label>
                <input
                  type="file"
                  id="imageUpload"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
                {image && (
                  <img
                    src={image}
                    alt="Preview"
                    className="w-24 h-24 rounded-full object-cover mx-auto mt-2"
                  />
                )}
              </div>
              <DialogFooter>
                <Button type="submit">
                  {profileLoading ? <Loader /> : "Save Changes"}
                </Button>
              </DialogFooter>
            </form>
          </motion.div>
        </DialogContent>
      </Dialog>

      {/* Update Password Dialog */}
      <Dialog open={isEditPasswordOpen} onOpenChange={setIsEditPasswordOpen}>
        <DialogContent>
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <DialogHeader className="mb-3">
              <DialogTitle>Update Password</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleEditPasswordSubmit} className="space-y-4">
              <div className="grid gap-2">
                <Label>Old Password</Label>
                <Input
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
              <div className="grid gap-2">
                <Label>New Password</Label>
                <Input
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
              <DialogFooter>
                <Button type="submit">
                  {passwordLoading ? <Loader /> : "Save Changes"}
                </Button>
              </DialogFooter>
            </form>
          </motion.div>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default MyProfile;
