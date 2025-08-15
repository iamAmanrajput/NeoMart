import React, { useEffect, useState } from "react";
import OrderData from "@/components/custom/OrderData";
import useErrorLogout from "@/hooks/use-error-logout";
import axios from "axios";
import Loader from "@/components/custom/Loader";
import { Colors } from "@/constants/colors";
import { motion, AnimatePresence } from "framer-motion";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const { handleErrorLogout } = useErrorLogout();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getMyOrders = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/order/get-order`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const { data } = res.data;
        setOrders(data);
      } catch (error) {
        handleErrorLogout(error);
      } finally {
        setLoading(false);
      }
    };

    getMyOrders();
  }, []);

  return (
    <motion.div
      className="w-full max-w-3xl mx-auto my-10 py-6 px-4 shadow-md rounded-xl bg-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="text-2xl font-extrabold mb-6 text-center">My Orders</h1>
      <div className="grid gap-6">
        {loading ? (
          <div className="flex justify-center py-12">
            <Loader width={7} height={30} color={Colors.customGray} />
          </div>
        ) : orders.length === 0 ? (
          <h2 className="text-lg text-center text-muted-foreground py-14">
            No Orders to Show
          </h2>
        ) : (
          <AnimatePresence>
            {orders.map((order, i) => (
              <motion.div
                key={order._id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
              >
                <OrderData {...order} />
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </motion.div>
  );
};

export default MyOrders;
