const Razorpay = require("razorpay");
const crypto = require("crypto");
require("dotenv").config();
const User = require("../models/user");
const Product = require("../models/product");
const Order = require("../models/order");

// Razorpay instance
const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY,
  key_secret: process.env.RAZORPAY_SECRET,
});

exports.generatePayment = async (req, res) => {
  try {
    const userId = req.id;
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid amount" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User Not Found" });
    }

    const options = {
      amount: amount * 100, // Convert rupees to paise
      currency: "INR",
      receipt: `receipt_${Math.random().toString(36).substring(2)}`,
    };

    instance.orders.create(options, (err, order) => {
      if (err) {
        console.error("Razorpay Order Creation Error:", err);
        return res
          .status(500)
          .json({ success: false, message: "Order creation failed" });
      }

      return res.status(200).json({
        success: true,
        data: { ...order, name: user.name },
      });
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.verifyPayment = async (req, res) => {
  try {
    const userId = req.id;
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      amount,
      productArray,
      address,
    } = req.body;

    // Validate required fields
    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature ||
      !amount ||
      !productArray.length
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required payment details" });
    }

    // Generate expected signature
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    // Compare signatures
    if (razorpay_signature !== expectedSignature) {
      return res
        .status(400)
        .json({ success: false, message: "Payment Verification Failed" });
    }

    // Update User & Product Stock
    for (const product of productArray) {
      await User.findByIdAndUpdate(userId, {
        $push: { purchasedProducts: product.id },
      });
      await Product.findByIdAndUpdate(product.id, {
        $inc: { stock: -product.quantity },
      });
    }

    // Create Order
    await Order.create({
      amount: amount / 100, // Convert paise to rupees
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      razorpaySignature: razorpay_signature,
      products: productArray,
      address,
      userId,
    });

    return res.status(200).json({ success: true, message: "Payment Verified" });
  } catch (error) {
    console.error("Payment Verification Error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
