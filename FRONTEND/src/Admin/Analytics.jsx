import React, { useEffect, useState } from "react";
import { SidebarInset } from "@/components/ui/sidebar";
import { Activity, CreditCard, DollarSign, User } from "lucide-react";
import { Chart1 } from "@/components/custom/Chart1";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useErrorLogout from "@/hooks/use-error-logout";
import axios from "axios";
import Loader from "@/components/custom/Loader";
import { Colors } from "@/constants/colors";

const Analytics = () => {
  const [metrics, setMetrics] = useState([]);
  const { handleErrorLogout } = useErrorLogout();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const getMetrics = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/order/get-metrics`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const { data } = res.data;
        setMetrics(data);
      } catch (error) {
        return handleErrorLogout(error);
      } finally {
        setLoading(false);
      }
    };

    getMetrics();
  }, []);

  return (
    <div className="w-screen md:w-[75vw] xl:w-[70vw] 2xl:w-[80vw] flex justify-center items-center">
      {loading ? (
        <div className="flex justify-center my-40">
          <Loader width={10} height={70} color={Colors.customGray} />
        </div>
      ) : (
        <SidebarInset>
          <div className="flex flex-col flex-1 gap-4 p-4">
            <div className="grid auto-rows-min gap-4 md:grid-cols-4">
              <div className="h-fit rounded-xl bg-muted/50 p-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-md font-semibold">Total Sales</h3>
                  <DollarSign size={16} />
                </div>
                <div className="grid mt-2">
                  <span className="text-2xl font-bold">
                    ₹ {metrics?.totalSales?.count}
                  </span>
                  <span className="text-sm font-semibold text-gray-400">
                    + {metrics?.totalSales?.growth.toFixed(2)}% from last month
                  </span>
                </div>
              </div>

              <div className="h-fit rounded-xl bg-muted/50 p-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-md font-semibold">Users</h3>
                  <User size={16} />
                </div>
                <div className="grid mt-2">
                  <span className="text-2xl font-bold">
                    + {metrics?.users?.count}
                  </span>
                  <span className="text-sm font-semibold text-gray-400">
                    + {metrics?.users?.growth.toFixed(2)}% from last month
                  </span>
                </div>
              </div>

              <div className="h-fit rounded-xl bg-muted/50 p-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-md font-semibold">Sales</h3>
                  <CreditCard size={16} />
                </div>
                <div className="grid mt-2">
                  <span className="text-2xl font-bold">
                    ₹ {metrics?.sales?.count}
                  </span>
                  <span className="text-sm font-semibold text-gray-400">
                    + {metrics?.sales?.growth.toFixed(2)}% from last month
                  </span>
                </div>
              </div>

              <div className="h-fit rounded-xl bg-muted/50 p-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-md font-semibold">Active Now</h3>
                  <Activity size={16} />
                </div>
                <div className="grid mt-2">
                  <span className="text-2xl font-bold">
                    {metrics?.activeNow?.count}
                  </span>
                  <span className="text-sm font-semibold text-gray-400">
                    + {metrics?.activeNow?.growth.toFixed(2)}% from last month
                  </span>
                </div>
              </div>
            </div>

            {/* chart */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Chart1 data={metrics?.sixMonthsBarChartData}></Chart1>
              <div className="p-5 bg-muted/50 rounded-lg">
                <h3 className="font-bold text-xl">Recent Sales</h3>
                <p className="text-sm mt-1 my-8">
                  You Make 40 sales in this month
                </p>
                <div className="flex flex-1 flex-col gap-4">
                  {metrics?.recentSales?.users?.map((user, index) => (
                    <div
                      key={user._id}
                      className="h-fit py-1 w-full xl:w-[20rem] rounded-lg flex justify-between items-center"
                    >
                      <div className="flex gap-4">
                        <Avatar>
                          {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
                          <AvatarFallback>
                            {user?.userId?.name?.charAt(0)?.toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="text-md font-semibold capitalize">
                            {user?.userId?.name}
                          </h3>
                          <p className="text-gray-400 text-sm">
                            {user?.userId?.email}
                          </p>
                        </div>
                      </div>
                      <h3 className="font-bold">₹ {user?.amount}</h3>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </SidebarInset>
      )}
    </div>
  );
};

export default Analytics;
