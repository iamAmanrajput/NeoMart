const express = require("express");
const router = express.Router();

const { isLoggedIn } = require("../middlewares/verifyToken");
const {
  createReview,
  updateReview,
  deleteReview,
  getReviews,
  replyReview,
} = require("../controllers/reviewController");

router.post("/create-review", isLoggedIn, createReview);

router.put("/update-review/:id", isLoggedIn, updateReview);

router.delete("/delete-review/:id", isLoggedIn, deleteReview);

router.get("/:id", getReviews);

router.put("/reply-review/:id", isLoggedIn, replyReview);

module.exports = router;
