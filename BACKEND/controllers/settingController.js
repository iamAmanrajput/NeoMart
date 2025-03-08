const { ROLES } = require("../utils/constants");
const Admin = require("../models/admin");
const bcrypt = require("bcryptjs");

exports.changeUsername = async (req, res) => {
  try {
    if (req.role !== ROLES.admin) {
      return res.status(401).json({ success: false, message: "Access Denied" });
    }
    const { previousUsername, newUsername } = req.body;
    if (!previousUsername || !newUsername) {
      return res.status(400).json({
        success: false,
        message: "Please provide both previous and new usernames",
      });
    }
    if (previousUsername === newUsername) {
      return res.status(400).json({
        success: false,
        message: "New username cannot be the same as the previous username",
      });
    }
    const user = await Admin.findOneAndUpdate(
      { username: previousUsername },
      { username: newUsername },
      { new: true }
    );
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Username not found" });
    }
    return res.status(200).json({
      success: true,
      message: `New username is : ${newUsername}`,
      user: {
        username: user.username,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.changePassword = async (req, res) => {
  try {
    if (req.role !== ROLES.admin) {
      return res.status(401).json({ success: false, message: "Access Denied" });
    }
    const { username, previousPassword, newPassword } = req.body;
    if (!username || !previousPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Please provide all the fields",
      });
    }
    if (previousPassword === newPassword) {
      return res.status(400).json({
        success: false,
        message: "New password cannot be the same as the previous password",
      });
    }

    let user = await Admin.findOne({ username });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const isMatch = await bcrypt.compare(previousPassword, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "previous password is incorrect" });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
    return res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
