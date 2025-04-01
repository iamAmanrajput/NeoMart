import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import OrderProductTile from "@/components/custom/OrderProductTile";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import useErrorLogout from "@/hooks/use-error-logout";
import axios from "axios";
import { toast } from "sonner";
import Loader from "@/components/custom/Loader";
import { Colors } from "@/constants/colors";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const { handleErrorLogout } = useErrorLogout();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_API_URL
          }/order/get-orders?page=${currentPage}&limit=10`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const { data, totalPages, currentPage: responsePage } = response.data;
        setOrders(data);
        setTotalPages(totalPages);
        setCurrentPage(responsePage); // Ensure correct variable is used
      } catch (error) {
        handleErrorLogout(
          error,
          error.response?.data?.message || "An error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [currentPage]);

  const updateOrderStatus = async (status, paymentId) => {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/order/update-status/${paymentId}`,
        { status },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      if (res.data.success) {
        toast(res.data.message);
      }
    } catch (error) {
      return handleErrorLogout(error, error?.response?.data?.message);
    }
  };

  return (
    <>
      <h1 className="text-3xl font-bold mb-2 ml-3">Orders</h1>
      <div className="flex flex-col gap-5 mx-auto ">
        <div className="space-y-8">
          <div className="p-4 space-y-4">
            <h2 className="text-xl font-medium">Order Summery</h2>
            <div className="grid space-y-1 gap-2 md:w-[70vw] 2xl:w-[80rem]">
              {loading ? (
                <div className="flex justify-center my-10">
                  <Loader width={7} height={30} color={Colors.customGray} />
                </div>
              ) : orders.length === 0 ? (
                <h2 className="text-primary text-3xl">
                  {" "}
                  Nothing to show, Please add some products...
                </h2>
              ) : (
                orders.map((item) => (
                  <Card key={item._id} className="space-y-2 p-3 shadow-md">
                    <div className="grid sm:grid-cols-3 gap-2">
                      {item?.products?.map((product) => (
                        <OrderProductTile key={product._id} {...product} />
                      ))}
                    </div>
                    <hr />
                    <div>
                      <p className="flex justify-between sm:justify-start gap-2 items-center px-3">
                        <span className="font-bold">Total:</span>
                        <span className="text-sm text-customGray">
                          ₹ {item?.amount}
                        </span>
                      </p>
                      <p className="flex justify-between sm:justify-start gap-2 items-center px-3">
                        <span className="font-bold">Address:</span>
                        <span className="text-sm text-customGray">
                          {item?.address}
                        </span>
                      </p>
                      <p className="flex justify-between sm:justify-start gap-2 items-center px-3">
                        <span className="font-bold">Name:</span>
                        <span className="text-sm text-customGray">
                          {item?.userId?.name}
                        </span>
                      </p>
                      <p className="flex justify-between sm:justify-start gap-2 items-center px-3">
                        <span className="font-bold">Email:</span>
                        <span className="text-sm text-customGray">
                          {item?.userId?.email}
                        </span>
                      </p>
                      <p className="flex justify-between sm:justify-start gap-2 items-center px-3">
                        <span className="font-bold">Payment Id:</span>
                        <span className="text-sm text-customGray">
                          {item?.razorpayPaymentId}
                        </span>
                      </p>
                    </div>
                    <Select
                      onValueChange={(value) => {
                        alert("Do You Really Want to update the status?");
                        updateOrderStatus(value, item.razorpayPaymentId);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pending" />
                      </SelectTrigger>
                      <SelectContent className="capitalize">
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="packed">packed</SelectItem>
                        <SelectItem value="in transit">in transit</SelectItem>
                        <SelectItem value="completed">completed</SelectItem>
                        <SelectItem value="failed">failed</SelectItem>
                      </SelectContent>
                    </Select>
                  </Card>
                ))
              )}
            </div>
          </div>
        </div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() => {
                  setCurrentPage((currentPage) =>
                    currentPage >= 2 ? currentPage - 1 : 1
                  );
                }}
              />
            </PaginationItem>
            <PaginationItem>
              {Array.from({ length: totalPages }, (data, i) => (
                <PaginationLink
                  href="#"
                  onClick={() => setCurrentPage(i + 1)}
                  key={i}
                >
                  {i + 1}
                </PaginationLink>
              ))}
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={() => setCurrentPage(currentPage + 1)}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </>
  );
};

export default Orders;
