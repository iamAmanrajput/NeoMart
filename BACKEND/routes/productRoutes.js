const express = require("express");
const router = express.Router();
const {
  createProduct,
  updateProduct,
  deleteProduct,
  getProducts,
  getProductByName,
  blacklistProduct,
  removeFromBlacklist,
} = require("../controllers/productController");
const { isLoggedIn } = require("../middlewares/verifyToken");

router.route("/create-product").post(isLoggedIn, createProduct);

router.route("/update-product/:id").put(isLoggedIn, updateProduct);

router.route("/delete-product/:id").delete(isLoggedIn, deleteProduct);

router.route("/get-products").get(getProducts);

router.route("/get-product/:name").get(getProductByName);

router.route("/blacklist-product/:id").put(isLoggedIn, blacklistProduct);

router.route("/remove-from-blacklist/:id").put(isLoggedIn, removeFromBlacklist);

module.exports = router;
