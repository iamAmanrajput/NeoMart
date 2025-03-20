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

    // Ensure images is an array
    if (!Array.isArray(images)) {
      images = [images];
    }

    for (const file of images) {
      const result = await uploadImageToCloudinary(file, "NeoMart");

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

exports.updateProduct = async (req, res) => {
  try {
    if (req.role !== ROLES.admin) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const { ...data } = req.body;
    const { id } = req.params;

    const product = await Product.findByIdAndUpdate(id, data, { new: true });
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    if (req.role !== ROLES.admin) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      data: product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// get all products with pagination, sorting, filtering and searching
exports.getProducts = async (req, res) => {
  try {
    let { page, limit, category, price, search } = req.query;
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 500;
    let query = {};

    if (category) {
      query.category = category.charAt(0).toUpperCase() + category.slice(1);
    }

    if (category == "all") {
      delete query.category;
    }

    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    if (price > 0) {
      query.price = { $lte: price };
    }

    const totalProducts = await Product.countDocuments(query);
    const totalPages = Math.ceil(totalProducts / limit);

    const products = await Product.find(query)
      .select("name price rating images description blacklisted")
      .skip((page - 1) * limit)
      .limit(limit);

    if (!products.length) {
      return res.status(404).json({
        success: false,
        message: "No products found",
      });
    }

    let newProductsArray = [];

    products.forEach((product) => {
      const productObj = product.toObject();
      productObj.image = productObj.images[0];
      delete productObj.images;
      newProductsArray.push(productObj);
    });

    return res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      data: newProductsArray,
      pagination: {
        totalProducts,
        totalPages,
        currentPage: page,
        pageSize: limit,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getProductByName = async (req, res) => {
  try {
    const { name } = req.params;
    let newname = name?.split("-").join(" ");
    const product = await Product.findOne({ name: newname });
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product fetched successfully",
      data: product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.blacklistProduct = async (req, res) => {
  try {
    if (req.role !== ROLES.admin) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(
      id,
      {
        blacklisted: true,
      },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: `Product ${product.name} has been blacklisted`,
      data: product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.removeFromBlacklist = async (req, res) => {
  try {
    if (req.role !== ROLES.admin) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(
      id,
      {
        blacklisted: false,
      },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: `Product ${product.name} has been removed from blacklist`,
      data: product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
