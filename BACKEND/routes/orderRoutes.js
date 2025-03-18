const express = require("express");

const router = express.Router();

const { isLoggedIn } = require("../middlewares/verifyToken");
const {
  getOrdersByUserId,
  getAllOrders,
  getMetrics,
  updateOrderStatus,
} = require("../controllers/orderController");

router.get("/get-order", isLoggedIn, getOrdersByUserId);
router.get("/get-orders", isLoggedIn, getAllOrders);
router.get("/get-metrics", isLoggedIn, getMetrics);
router.put("/update-status/:paymentId", isLoggedIn, updateOrderStatus);

module.exports = router;
