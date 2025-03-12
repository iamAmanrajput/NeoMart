const Razorpay = require("razorpay");
require("dotenv").config();
const User = require("../models/user");
const Product = require("../models/product");
const Order = require("../models/order");

var {
  validatePaymentVerification,
} = require("razorpay/dist/utils/razorpay-utils");

//razorpay instance
var instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY,
  key_secret: process.env.RAZORPAY_SECRET,
});

exports.generatePayment = async (req, res) => {
  try {
    const userId = req.id;
    const { amount } = req.body;
    var options = {
      amount: amount * 100, // Amount * 100 bcz yaha pe paise me aate hai usko rs me convert kiya
      currency: "INR",
      receipt: Math.random().toString(36).substring(2), // tostring(36) means numbers are a-z aur 0-9
    };
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User Not Found" });
    }
    instance.orders.create(options, async (err, order) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ success: false, message: err });
      }

      return res.status(200).json({
        success: true,
        data: {
          ...order,
          name: user.name,
        },
      });
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//revise code
exports.verifyPayment = async (req, res) => {
  try {
    const userId = req.id;
    const {
      razorpay_order_id,
      razorpay_payment_id,
      amount,
      productArray,
      address,
    } = req.body;
    const signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");
    const validatedPayment = validatePaymentVerification(
      { order_id: razorpay_order_id, payment_id: razorpay_payment_id },
      signature,
      process.env.RAZORPAY_SECRET
    );
    if (!validatedPayment) {
      return res
        .status(400)
        .json({ success: false, message: "Payment Verification Failed" });
    }
    for (const product of productArray) {
      await User.findByIdAndUpdate(
        { _id: userId },
        { $push: { purchasedProducts: product.id } }
      );
      await Product.findByIdAndUpdate(
        { _id: product.id },
        { $inc: { stock: -product.quantity } }
      );
    }
    await Order.create({
      amount: amount / 100, // paise ko normal rupees me convert kar rhe hai
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      razorpaySignature: signature,
      products: productArray,
      address: address,
      userId: userId,
    });
    return res.status(200).json({ success: true, message: "Payment Verified" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
