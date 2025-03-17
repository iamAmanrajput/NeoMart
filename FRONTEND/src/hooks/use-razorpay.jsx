import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const useRazorpay = () => {
  const navigate = useNavigate();
  const generatePayment = async (amount) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/payment/generate-payment`,
        { amount },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = res.data;
      return data.data;
    } catch (error) {
      return toast.error(error.response.data.message);
    }
  };

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const verifyPayment = async (options, productArray, address) => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      return toast.error("Razorpay SDK failed to load. Are You online?");
    }

    const paymentObject = new window.Razorpay({
      key: import.meta.env.VITE_RAZORPAY_KEY,
      ...options,
      image:
        "https://images.pexels.com/photos/19012033/pexels-photo-19012033/free-photo-of-gaming-computer-mouse.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      handler: async (response) => {
        try {
          const res = await axios.post(
            `${import.meta.env.VITE_API_URL}/payment/verify-payment`,
            {
              razorpay_order_id: options.id,
              razorpay_payment_id: response.razorpay_payment_id,
              amount: options.amount,
              address,
              productArray,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );

          const { data } = res.data;
          toast(data.message);
          navigate("/succes");
        } catch (error) {
          return toast.error(error.response.data.message);
        }
      },
      theme: {
        color: "#F37254",
      },
    });
    paymentObject.open();
  };

  return { generatePayment, verifyPayment };
};

export default useRazorpay;
