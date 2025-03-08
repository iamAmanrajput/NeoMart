const Product = require("../models/product");
const { ROLES } = require("../utils/constants");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

exports.createProduct = async (req, res) => {
  try {
    // Authorization Check
    if (req.role !== ROLES.admin) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    // Required Fields Validation
    const { name, description, price, category, stock, colors } = req.body;
    if (
      !name ||
      !description ||
      !price ||
      !category ||
      !stock ||
      !colors ||
      colors.length === 0
    ) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // Image Upload Handling
    if (!req.files || !req.files.images) {
      return res
        .status(400)
        .json({ success: false, message: "Product images are required" });
    }

    let uploadedImages = [];
    let images = req.files.images;
    console.log("Images : ", images);

    // Ensure images is an array
    if (!Array.isArray(images)) {
      images = [images];
    }

    for (const file of images) {
      const result = await uploadImageToCloudinary(file, "products");

      uploadedImages.push({
        url: result.secure_url,
        id: result.public_id,
      });
    }

    // Create & Save Product
    const product = new Product({
      name,
      description,
      price,
      category,
      stock,
      colors,
      images: uploadedImages,
    });

    await product.save();

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
