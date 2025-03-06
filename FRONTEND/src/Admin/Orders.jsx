import React from "react";
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

const Orders = () => {
  return (
    <>
      <h1 className="text-3xl font-bold mb-2 ml-3">Orders</h1>
      <div className="flex flex-col gap-5 mx-auto ">
        <div className="space-y-8">
          <div className="p-4 space-y-4">
            <h2 className="text-xl font-medium">Order Summery</h2>
            <div className="grid space-y-1 gap-2 md:w-[70vw] 2xl:w-[80rem]">
              <Card className="space-y-2 p-3 shadow-md">
                <div className="grid sm:grid-cols-3 gap-2">
                  <OrderProductTile />
                  <OrderProductTile />
                  <OrderProductTile />
                </div>
                <hr />
                <div>
                  <p className="flex justify-between sm:justify-start gap-2 items-center px-3">
                    <span className="font-bold">Total:</span>
                    <span className="text-sm text-customGray">₹560</span>
                  </p>
                  <p className="flex justify-between sm:justify-start gap-2 items-center px-3">
                    <span className="font-bold">Address:</span>
                    <span className="text-sm text-customGray">
                      Lorem, ipsum dolor sit amet consectetur
                    </span>
                  </p>
                  <p className="flex justify-between sm:justify-start gap-2 items-center px-3">
                    <span className="font-bold">Name:</span>
                    <span className="text-sm text-customGray">Aman Singh</span>
                  </p>
                  <p className="flex justify-between sm:justify-start gap-2 items-center px-3">
                    <span className="font-bold">Email:</span>
                    <span className="text-sm text-customGray">
                      aman.it360@gmail.com
                    </span>
                  </p>
                  <p className="flex justify-between sm:justify-start gap-2 items-center px-3">
                    <span className="font-bold">Payment Id:</span>
                    <span className="text-sm text-customGray">
                      asdhjbfjdhbfd
                    </span>
                  </p>
                </div>
                <Select>
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
            </div>
          </div>
        </div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </>
  );
};

export default Orders;
