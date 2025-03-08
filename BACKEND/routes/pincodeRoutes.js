const express = require("express");
const router = express.Router();

const { addPincodes, getPincode } = require("../controllers/pincodeController");

router.post("/add-pincodes", addPincodes);
router.get("/get-pincode/:pincode", getPincode);

module.exports = router;
