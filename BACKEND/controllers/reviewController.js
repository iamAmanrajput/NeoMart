const Review = require("../models/review");
const Product = require("../models/product");
const User = require("../models/user");
const { ROLES } = require("../utils/constants");

exports.createReview = async (req, res) => {
  try {
    if (req.role !== ROLES.user) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const userId = req.id;
    const { productId, rating, review } = req.body;

    const newReview = await Review.create({
      userId,
      productId,
      rating,
      review,
    });

    newReview.populate("userId", "name");

    let product = await Product.findByIdAndUpdate(
      productId,
      { $push: { reviews: newReview._id } },
      { new: true }
    );

    await product.calculateRating();

    return res.status(201).json({
      success: true,
      message: "Review created successfully",
      data: newReview,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateReview = async (req, res) => {
  try {
    if (req.role !== ROLES.user) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const { id } = req.params;
    const { updatedReview } = req.body;
    let review = await Review.findByIdAndUpdate(
      id,
      { review: updatedReview },
      {
        new: true,
      }
    );

    await review.populate("userId", "name");

    if (!review) {
      return res
        .status(404)
        .json({ success: false, message: "Review Not Found" });
    }

    return res
      .status(200)
      .json({ success: false, message: "Review Updated", data: review });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.replyReview = async (req, res) => {
  try {
    if (req.role !== ROLES.user) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const userId = req.id;
    const { id } = req.params;
    const { review } = req.body;
    let Foundreview = await Review.findByIdAndUpdate(
      id,
      {
        $push: { replies: { userId, review } },
      },
      { new: true }
    )
      .populate("replies.userId", "name")
      .populate("userId", "name"); // first time reply ka userid , second time review ka

    if (!Foundreview) {
      return res
        .status(404)
        .json({ success: false, message: "Review Not Found" });
    }

    return res.status(200).json({
      success: true,
      message: "Reply Added Successfully",
      data: Foundreview,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    if (req.role !== ROLES.user) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const { id } = req.params;
    let review = await Review.findByIdAndDelete(id);
    if (!review) {
      return res
        .status(404)
        .json({ success: false, message: "Review Not Found" });
    }

    let product = await Product.findByIdAndUpdate(review.productId, {
      $pull: { reviews: review._id },
    });

    await product.calculateRating();

    return res.status(200).json({ success: true, message: "Review Deleted" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getReviews = async (req, res) => {
  try {
    const { id } = req.params;
    let reviews = await Review.find({ productId: id })
      .populate({
        path: "userId",
        select: "name",
      })
      .populate({
        path: "replies.userId",
        select: "name",
      });

    if (!reviews) {
      return res
        .status(404)
        .json({ success: false, message: "Reviews Not Found" });
    }

    return res.status(200).json({
      success: true,
      data: reviews,
      message: "Reviews Fetched Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
