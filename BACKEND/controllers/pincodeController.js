const Pincode = require("../models/pincode");
const { ROLES } = require("../utils/constants");

exports.addPincodes = async (req, res) => {
  try {
    if (req.role !== ROLES.admin) {
      return res.status(401).json({
        success: false,
        message: "Access Denied",
      });
    }

    const { pincodes } = req.body; // array aayegi pincode ki
    if (!pincodes || pincodes.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Please Provide Pincodes" });
    }

    const existingPincodes = await Pincode.find({
      pincode: { $in: pincodes.map((p) => p.pincode) },
    });

    //getting values
    const existingPincodesValue = existingPincodes.map((p) => p.pincode);

    const newPincodes = pincodes.filter(
      (p) => !existingPincodesValue.includes(p.pincode)
    );

    if (newPincodes.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "All Pincodes Already exist" });
    }

    await Pincode.insertMany(newPincodes);

    return res
      .status(200)
      .json({ success: true, message: "Pincode Added Successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.getPincode = async (req, res) => {
  try {
    const { pincode } = req.params;

    const existingPincode = await Pincode.find({ pincode });
    if (existingPincode.length === 0) {
      return res.status(404).json({
        success: false,
        message: "We will be available in your area soon.",
      });
    }
    return res
      .status(200)
      .json({ success: true, message: "Delivery Available" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
