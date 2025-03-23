import React, { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { starGenerator } from "@/constants/Helper";
import useErrorLogout from "@/hooks/use-error-logout";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";
import { Delete, Edit2 } from "lucide-react";
import { Colors } from "@/constants/colors";

const ReviewComponent = ({ productId }) => {
  const [reviewList, setReviewList] = useState([]);
  const [editing, setEditing] = useState({
    status: false,
    reviewId: null,
    review: "",
  });
  const [newReview, setNewReview] = useState({
    review: "",
    rating: 0,
  });
  const [newReply, setNewReply] = useState({ review: "" });
  const [replyingTo, setReplyingTo] = useState(null);

  const { handleErrorLogout } = useErrorLogout();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const getReviews = async () => {
      if (!productId) {
        return;
      }
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/review/${productId}`
        );
        const { data } = await res.data;
        setReviewList(data);
      } catch (error) {
        handleErrorLogout(error);
      }
    };
    getReviews();
  }, [productId]);

  const addReview = async () => {
    if (!newReview.review || !newReview.rating) {
      toast.error("Review and Rating Cannot be empty");
      return;
    }
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/review/create-review`,
        {
          rating: newReview.rating,
          review: newReview.review,
          productId: productId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const { data, message } = res.data;
      toast(message);
      setReviewList([...reviewList, data]);
      setNewReview({ review: "", rating: 0 });
    } catch (error) {
      return handleErrorLogout(error);
    }
  };

  const deleteReview = async (reviewId) => {
    if (!confirm("Are You Sure You want to delete this Review?")) {
      return;
    }
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_API_URL}/review/delete-review/${reviewId}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      const { message } = res.data;
      toast(message);
      setReviewList(reviewList.filter((review) => review._id !== reviewId));
    } catch (error) {
      return handleErrorLogout(error, "Error While deleting Review");
    }
  };

  const editReview = async (reviewId) => {
    if (!confirm("Are You Sure You want to edit this Review?")) {
      return;
    }
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/review/update-review/${reviewId}`,
        { updatedReview: editing.review },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      const { data, message } = res.data;
      setReviewList(
        reviewList.map((review) => (review._id === reviewId ? data : review))
      );
      toast(message);
      setEditing({ status: false, reviewId: null, review: "" });
    } catch (error) {
      return handleErrorLogout(error, "Error while editing review");
    }
  };

  const replyReview = async (reviewId) => {
    if (!newReply.review) {
      return toast.error("Reply Cannot be empty");
    }
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/review/reply-review/${reviewId}`,
        {
          review: newReply.review,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      const { data, message } = res.data;
      toast(message);
      setReviewList((prev) => {
        return prev.map((review) => {
          if (review._id === reviewId) {
            return data;
          }
          return review;
        });
      });
      setNewReply({ review: "" });
      setReplyingTo(null);
    } catch (error) {
      return handleErrorLogout(error, "Error while reply");
    }
  };

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
        <Textarea
          placeholder="Your Review"
          className="mb-4"
          value={newReview.review}
          onChange={(e) =>
            setNewReview({ ...newReview, review: e.target.value })
          }
        />
        <div className="flex gap-5">
          <Input
            type="number"
            max="5"
            min="1"
            className="mb-4 w-[10rem]"
            placeholder="Rating (1-5)"
            value={newReview.rating}
            onChange={(e) =>
              setNewReview({ ...newReview, rating: Number(e.target.value) })
            }
          />
          <Button className="cursor-pointer" onClick={addReview}>
            Submit Review
          </Button>
        </div>
      </div>

      {/*  REVIEWS LIST */}
      <div className="space-y-6 my-10">
        {reviewList?.map((review) => (
          <div
            key={review?._id}
            className="bg-white border border-gray-200 p-6 rounded-2xl shadow-lg dark:bg-zinc-900 dark:border-none"
          >
            {/* REVIEWER INFO */}
            <div className="flex mb-4 items-center">
              <img
                src="https://placehold.co/40"
                alt={review?.userId?.name}
                className="w-10 h-10 rounded-full mr-4 border  border-gray-300"
              />
              <div>
                <h4>{review?.userId?.name}</h4>
                <div className="flex items-center mt-1">
                  {starGenerator(review?.rating, "0", 15)}
                </div>
              </div>
            </div>
            {/* Review Content */}
            {user?.id === review?.userId?._id &&
            editing.status &&
            editing.reviewId === review?._id ? (
              <Input
                value={editing?.review}
                onChange={(e) =>
                  setEditing({
                    review: e.target.value,
                    status: true,
                    reviewId: review?._id,
                  })
                }
              />
            ) : (
              <p className="text-gray-600 text-sm dark:text-customGray">
                {review?.review}
              </p>
            )}

            {/* Reply Section */}

            {review?.replies?.length > 0 && (
              <div className="mt-5 bg-gray-50 p-4 rounded-lg dark:bg-zinc-800 border">
                <h5 className="font-bold tetx-sm text-gray-700 mb-3 dark:text-customYellow">
                  Replies ({review?.replies?.length})
                </h5>
                <div className="space-y-4">
                  {review?.replies?.map((reply) => (
                    <div
                      key={reply?._id}
                      className="flex items-start space-x-4 border-b pb-3 lg:border-none"
                    >
                      <img
                        src="https://placehold.co/32"
                        alt={reply?.userId?.name}
                        className="w-8 h-8 rounded-full  border  border-gray-300"
                      />
                      <div>
                        <h6 className="font-medium text-gray-800 text-sm dark:text-customIsabelline capitalize">
                          {reply?.userId?.name}
                        </h6>
                        <p className="text-gray-600 text-sm dark:text-customGray">
                          {reply?.review}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {replyingTo === review?._id && (
              <div className="mt-4">
                <Textarea
                  placeholder="Write your reply..."
                  value={newReply?.review}
                  onChange={(e) => setNewReply({ review: e.target.value })}
                />
                <Button
                  className="mt-4 cursor-pointer"
                  onClick={() => replyReview(review?._id)}
                  size="sm"
                >
                  Reply
                </Button>
              </div>
            )}
            <div className="flex gap-5 justify-start items-center mt-4">
              <button
                onClick={() =>
                  setReplyingTo(replyingTo === review._id ? null : review._id)
                }
                className="text-sm text-customYellow hover:underline cursor-pointer"
              >
                {replyingTo === review?._id ? "Cancel" : "Reply"}
              </button>
              {user?.id === review?.userId?._id && (
                <>
                  {editing.status ? (
                    <span
                      onClick={() => editReview(review?._id)}
                      className="text-sm text-customYellow cursor-pointer hover:underline"
                    >
                      Save
                    </span>
                  ) : (
                    <span
                      className="flex items-center gap-2 border-2 bg-transparent hover:border-customYellow cursor-pointer text-customYellow"
                      onClick={() =>
                        setEditing({
                          status: true,
                          reviewId: review?._id,
                          review: review?.review,
                        })
                      }
                    >
                      <Edit2 size={15} color={Colors.customYellow} />
                      <span>Edit</span>
                    </span>
                  )}
                  <span
                    className="flex items-center gap-2 border-2 bg-transparent hover:border-customYellow cursor-pointer text-customYellow"
                    onClick={() => deleteReview(review?._id)}
                  >
                    <Delete size={20} color={Colors.customYellow} />
                    <span>Delete</span>
                  </span>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewComponent;
