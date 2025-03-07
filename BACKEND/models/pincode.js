const mongoose = require("mongoose");

const pincodeSchema = new mongoose.Schema(
  {
    pincode: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Pincode", pincodeSchema);
