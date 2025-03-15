import { setUserLogout } from "@/redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { Navigate } from "react-router-dom";

const useErrorLogout = () => {
  const dispatch = useDispatch();

  const handleErrorLogout = (error, otherTitle = "An error occurred") => {
    if (error?.response?.status === 401) {
      dispatch(setUserLogout());
      toast.error("Session Expired, Please login again to continue");
    } else {
      const errorMessage =
        error?.response?.data?.message || "Something went wrong!";
      toast.error(`${otherTitle}: ${errorMessage}`);
    }
  };

  return { handleErrorLogout };
};

export default useErrorLogout;
