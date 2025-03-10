const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.isLoggedIn = async (req, res, next) => {
  try {
    // Token ko cookies ya headers se lena
    const token =
      req.cookies?.token || req.headers["authorization"]?.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized Request" });
    }

    // Token verify
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res
          .status(401)
          .json({ success: false, message: "Invalid or Expired Token" });
      }

      req.id = decoded.id;
      req.role = decoded.role;
      next();
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
