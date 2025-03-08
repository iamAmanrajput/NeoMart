const express = require("express");
const router = express.Router();

const { addPincodes, getPincode } = require("../controllers/pincodeController");
const { isLoggedIn } = require("../middlewares/verifyToken");

router.post("/add-pincodes", isLoggedIn, addPincodes);
router.get("/:pincode", getPincode);

module.exports = router;
