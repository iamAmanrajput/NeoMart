const express = require("express");
const { isLoggedIn } = require("../middlewares/verifyToken");
const {
  updateProfile,
  updatePassword,
} = require("../controllers/userController");

const router = express.Router();

router.put("/update-profile", isLoggedIn, updateProfile);
router.put("/update-password", isLoggedIn, updatePassword);

module.exports = router;
