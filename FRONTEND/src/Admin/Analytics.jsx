import React from "react";
import { SidebarInset } from "@/components/ui/sidebar";
import { Activity, CreditCard, DollarSign, User } from "lucide-react";
import { Chart1 } from "@/components/custom/Chart1";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Analytics = () => {
  return (
    <div className="w-screen md:w-[75vw] xl:w-[70vw] 2xl:w-[80vw] flex justify-center items-center">
      <SidebarInset>
        <div className="flex flex-col flex-1 gap-4 p-4">
          <div className="grid auto-rows-min gap-4 md:grid-cols-4">
            <div className="h-fit rounded-xl bg-muted/50 p-4">
              <div className="flex justify-between items-center">
                <h3 className="text-md font-semibold">Total Sales</h3>
                <DollarSign size={16} />
              </div>
              <div className="grid mt-2">
                <span className="text-2xl font-bold">₹4500</span>
                <span className="text-sm font-semibold text-gray-400">
                  +80% from last month
                </span>
              </div>
            </div>

            <div className="h-fit rounded-xl bg-muted/50 p-4">
              <div className="flex justify-between items-center">
                <h3 className="text-md font-semibold">Users</h3>
                <User size={16} />
              </div>
              <div className="grid mt-2">
                <span className="text-2xl font-bold">+4</span>
                <span className="text-sm font-semibold text-gray-400">
                  +80% from last month
                </span>
              </div>
            </div>

            <div className="h-fit rounded-xl bg-muted/50 p-4">
              <div className="flex justify-between items-center">
                <h3 className="text-md font-semibold">Sales</h3>
                <CreditCard size={16} />
              </div>
              <div className="grid mt-2">
                <span className="text-2xl font-bold">₹45004</span>
                <span className="text-sm font-semibold text-gray-400">
                  +80% from last month
                </span>
              </div>
            </div>

            <div className="h-fit rounded-xl bg-muted/50 p-4">
              <div className="flex justify-between items-center">
                <h3 className="text-md font-semibold">Active Now</h3>
                <Activity size={16} />
              </div>
              <div className="grid mt-2">
                <span className="text-2xl font-bold">2</span>
                <span className="text-sm font-semibold text-gray-400">
                  +80% from last month
                </span>
              </div>
            </div>
          </div>

          {/* chart */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Chart1></Chart1>
            <div className="p-5 bg-muted/50 rounded-lg">
              <h3 className="font-bold text-xl">Recent Sales</h3>
              <p className="text-sm mt-1 my-8">
                You Make 40 sales in this month
              </p>
              <div className="flex flex-1 flex-col gap-4">
                <div className="h-fit py-1 w-full xl:w-[20rem] rounded-lg flex justify-between items-center">
                  <div className="flex gap-4">
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-md font-semibold capitalize">
                        Aman Singh
                      </h3>
                      <p className="text-gray-400 text-sm">
                        aman.it360@gmail.com
                      </p>
                    </div>
                  </div>
                  <h3 className="font-bold">₹500</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </div>
  );
};

export default Analytics;
