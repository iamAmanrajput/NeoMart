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

exports.getMetrics = async (req, res) => {
  try {
    if (req.role !== ROLES.admin) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to access this resource",
      });
    }
    const { startDate, endDate } = req.query;
    const start = new Date(
      startDate || new Date().setMonth(new Date().getMonth() - 1)
    );

    const end = new Date(endDate || new Date());

    //calculate this month order
    const ordersInRange = await Order.find({
      createdAt: { $gte: start, $lt: end },
    });

    const totalSales = ordersInRange.reduce(
      (acc, order) => acc,
      order.totalPrice,
      0
    );

    // calculate this month's orders
    const thisMonthOrders = ordersInRange;

    //get the last month -- agar admin se start,end date de di to nhi milega last month order data
    const lastMonth = new Date(new Date().setMonth(new Date().getMonth() - 1));

    //calculate last month orders
    const lastMonthOrders = await Order.find({
      createdAt: { $gte: lastMonth, $lt: start },
    });

    //calculate total amount of this months orders
    const totalThisMonth = thisMonthOrders.reduce(
      (acc, order) => acc,
      order.totalPrice,
      0
    );

    //calculate totoal amount of last month's orders
    const totalLastMonth = lastMonthOrders.reduce(
      (acc, order) => acc,
      order.totalPrice,
      0
    );

    // claculate growth
    const salesGrowth = totalLastMonth
      ? ((totalThisMonth - totalLastMonth) / totalLastMonth) * 100
      : 0;

    //calculate users

    const thisMonthUsers = await User.find({
      createdAt: { $gte: start, $lt: end },
    });

    const lastMonthUsers = await User.find({
      createdAt: { $gte: lastMonth, $lt: start },
    });

    const usersGrowth = lastMonthUsers.length
      ? ((thisMonthUsers.length - lastMonthUsers.length) /
          lastMonthUsers.length) *
        100
      : 0;

    //calculate users purchased in last hour
    const lastHour = new Date(new Date().setHours(new Date().getHours() - 1));
    const lastHourOrders = await Order.find({
      createdAt: { gte: lastHour, $lte: new Date() },
    });

    const previousDayOrders = await Order.find({
      createdAt: {
        $gte: new Date(new Date().setDate(new Date().getDate() - 1)),
      },
    });

    const lastHourGrowth = previousDayOrders.length
      ? (lastHourOrders.length / previousDayOrders.length) * 100
      : 0;

    // recent sales
    const recentOrders = await Order.find()
      .populate({
        path: "userId",
        select: "name email",
      })
      .sort({ createdAt: -1 })
      .limit(9);

    //product deliverd in last six months with their category and count according to month
    const sixMonthsAgo = new Date(
      new Date().setMonth(new Date().getMonth() - 6)
    );
    const sixMonthOrders = await Order.find({
      createdAt: { $gte: sixMonthsAgo },
    }).populate({
      path: "products.id",
      select: "category",
    });

    return;
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
