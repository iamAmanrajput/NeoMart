import React, { useEffect, useState } from "react";
import OrderData from "@/components/custom/OrderData";
import useErrorLogout from "@/hooks/use-error-logout";
import axios from "axios";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const { handleErrorLogout } = useErrorLogout();

  useEffect(() => {
    const getMyOrders = async () => {
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
        return handleErrorLogout(error);
      }
    };
    getMyOrders();
  }, [orders]);
  return (
    <div className="w-[90vw] lg:w-[50vw] mx-auto my-10 sm:my-32 grid gap-3">
      <h1 className="text-2xl font-bold">My Orders</h1>
      <div className="grid gap-3">
        {orders.length === 0 ? (
          <h1>No Orders to Show</h1>
        ) : (
          orders.map((order) => <OrderData key={order._id} {...order} />)
        )}
      </div>
    </div>
  );
};

export default MyOrders;
