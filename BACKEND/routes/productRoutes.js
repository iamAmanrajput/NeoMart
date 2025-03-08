const express = require("express");
const router = express.Router();
const { createProduct } = require("../controllers/productController");
const { isLoggedIn } = require("../middlewares/auth");

router.route("/create-product").post(isLoggedIn, createProduct);

module.exports = router;
