const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profileImg: {
      url: {
        type: String,
      },
      publicId: {
        type: String,
      },
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    otp: {
      type: Number,
      default: 0,
    },
    role: {
      type: String,
      default: "user",
      enum: ["user"],
    },
    purchasedProducts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
