const express = require("express");
const { isLoggedIn } = require("../middlewares/verifyToken");
const { updateProfile } = require("../controllers/userController");

const router = express.Router();

router.put("/update-profile", isLoggedIn, updateProfile);

module.exports = router;
