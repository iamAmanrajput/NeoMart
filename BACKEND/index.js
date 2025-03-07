const express = require("express");
const app = express();

require("dotenv").config();

const { connectDb } = require("./config/database");
connectDb();

const PORT = process.env.PORT || 3000;
const cors = require("cors");
const { connect } = require("mongoose");

//handling connection error
app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send(`<center><h1>Server Running On Port : ${PORT}</h1></center>`);
});

//routes
app.use("/api/v1/user", require("./routes/authRoutes"));

//admin routes
app.use("/api/v1/admin", require("./routes/adminRoutes"));

app.listen(PORT, () => {
  console.log(`Server is running on port : ${PORT}`);
});
