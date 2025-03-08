const express = require("express");
const router = express.Router();

const { isLoggedIn } = require("../middlewares/verifyToken");
const {
  changeUsername,
  changePassword,
} = require("../controllers/settingController");

router.put("/update-username", isLoggedIn, changeUsername);
router.put("/update-password", isLoggedIn, changePassword);

module.exports = router;
