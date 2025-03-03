import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { starGenerator } from "@/constants/Helper";

const ReviewComponent = () => {
  return (
    <div className=" my-10 sm:my-20 w-[92.5vw] lg:w-[70vw] mx-auto">
      <h3 className="font-extrabold text-2xl text-gray-800 dark:text-white mb-8 text-center">
        Reviews
      </h3>

      {/* WRITE REVIEW SECTION */}
      <div className="rounded-lg">
        <h4 className="font-semibold text-lg text-gray-700 dark:text-customIsabelline mb-4">
          Write a Review
        </h4>
        <Textarea placeholder="Your Review" className="mb-4" />
        <div className="flex gap-5">
          <Input
            type="number"
            max="5"
            min="1"
            className="mb-4 w-[10rem]"
            placeholder="Rating (1-5)"
          />
          <Button>Submit Review</Button>
        </div>
      </div>

      {/*  REVIEWS LIST */}
      <div className="space-y-6 my-10">
        <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-lg dark:bg-zinc-900 dark:border-none">
          {/* REVIEWER INFO */}
          <div className="flex mb-4 items-center">
            <img
              src="https://placehold.co/40"
              alt=""
              className="w-10 h-10 rounded-full mr-4 border  border-gray-300"
            />
            <div>
              <h4>Aman Singh</h4>
              <div className="flex items-center mt-1">
                {starGenerator(5, "0", 15)}
              </div>
            </div>
          </div>
          {/* Review Content */}
          <p className="text-gray-600 text-sm dark:text-customGray">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corporis,
            eligendi?
          </p>
          {/* Reply Section */}
          <div className="mt-5 bg-gray-50 p-4 rounded-lg dark:bg-zinc-800 border">
            <h5 className="font-bold tetx-sm text-gray-700 mb-3 dark:text-customYellow">
              Replies (2)
            </h5>
            <div className="space-y-4">
              <div className="flex items-start space-x-4 border-b pb-3 lg:border-none">
                <img
                  src="https://placehold.co/32"
                  alt=""
                  className="w-8 h-8 rounded-full  border  border-gray-300"
                />
                <div>
                  <h6 className="font-medium text-gray-800 text-sm dark:text-customIsabelline capitalize">
                    Coder
                  </h6>
                  <p className="text-gray-600 text-sm dark:text-customGray">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Tempore, quidem.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <Textarea placeholder="Write your reply..." />
            <Button className="mt-4" size="sm">
              Reply
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewComponent;
