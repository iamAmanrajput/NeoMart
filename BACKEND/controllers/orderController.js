const { ROLES } = require("../utils/constants");
const Order = require("../models/order");
const User = require("../models/user");
const Product = require("../models/product");

exports.getOrdersByUserId = async (req, res) => {
  try {
    const userId = req.id;
    const orders = await Order.find({ userId }).populate({
      path: "products.id",
      select: "name price category images",
    });

    if (!orders) {
      return res.status(404).json({
        success: false,
        message: "No Orders To Show",
      });
    }
    return res.status(200).json({ success: true, data: orders });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    if (req.role !== ROLES.admin) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const { page, limit } = req;
    const orders = await Order.find()
      .populate({
        path: "product.id",
        select: "name price category images",
      })
      .populate({
        path: "userId",
        select: "name email",
      })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 }); // latest order sabse pehle dikhega

    if (!orders) {
      return res.status(404).json({
        success: false,
        message: "No Orders to Show",
      });
    }

    const count = await Order.countDocuments();

    return res.status(200).json({
      success: false,
      data: orders,
      totalPages: Math.ceil(count / limit),
      currentPage: Number(page),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    if (req.role !== ROLES.admin) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to access this resource",
      });
    }
    const { paymentId } = req.params;
    const { status } = req.body;
    const order = Order.findOneAndUpdate(
      { razorpayPaymentId: paymentId },
      { status },
      { new: true }
    );
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order Not Found",
      });
    }
    return res
      .status(200)
      .json({ success: true, data: order, message: "Order Status Updated" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
