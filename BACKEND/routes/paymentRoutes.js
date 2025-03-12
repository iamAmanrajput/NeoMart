const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middlewares/verifyToken");
const {
  generatePayment,
  verifyPayment,
} = require("../controllers/paymentController");

router.post("/generate-payment", isLoggedIn, generatePayment);
router.post("/verify-payment", isLoggedIn, verifyPayment);

module.exports = router;
