const mongoose = require("mongoose");
const Review = require("./review");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    stock: { type: Number, required: true },
    images: { type: Array, required: true },
    rating: { type: Number, default: 5 },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
    colors: { type: Array, required: true },
    blacklisted: { type: Boolean, default: false },
    category: {
      type: String,
      required: true,
      enum: ["Keyboard", "Mouse", "Headset"],
    },
  },
  { timestamps: true }
);

productSchema.methods.calculateRating = async function () {
  const reviews = await Review.find({ productId: this._id });
  if (reviews.length > 0) {
    const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
    this.rating = totalRating / reviews.length;
  } else {
    this.rating = 5;
  }
  await this.save();
};

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

module.exports = Product;
