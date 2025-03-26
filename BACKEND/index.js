const express = require("express");
const app = express();

require("dotenv").config();

const { connectDb } = require("./config/database");
connectDb();

const { cloudinaryConnect } = require("./config/cloudinary");
cloudinaryConnect();
const fileUpload = require("express-fileupload");

const PORT = process.env.PORT || 4000;
const cors = require("cors");

//handling connection error
app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.get("/", (req, res) => {
  res.send(`<center><h1>Server Running On Port : ${PORT}</h1></center>`);
});

//routes
app.use("/api/v1/user", require("./routes/authRoutes"));
app.use("/api/v1/pincode", require("./routes/pincodeRoutes"));
app.use("/api/v1/payment", require("./routes/paymentRoutes"));
app.use("/api/v1/review", require("./routes/reviewRoutes"));
app.use("/api/v1/profile", require("./routes/profileRoutes"));

//admin routes
app.use("/api/v1/admin", require("./routes/adminRoutes"));
app.use("/api/v1/setting", require("./routes/settingRoutes"));
app.use("/api/v1/product", require("./routes/productRoutes"));
app.use("/api/v1/order", require("./routes/orderRoutes"));

app.listen(PORT, () => {
  console.log(`Server is running on port : ${PORT}`);
});
