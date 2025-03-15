import { setUserLogout } from "@/redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

const useErrorLogout = () => {
  const dispatch = useDispatch();
  const handleErrorLogout = (error, othertTitle = "error occured") => {
    if (error.response.status == 401) {
      dispatch(setUserLogout());
      toast.error("Session Expired, Please login again to continue");
    } else {
      toast.error(othertTitle, error?.response?.data.message);
    }
  };

  return { handleErrorLogout };
};

export default useErrorLogout;
