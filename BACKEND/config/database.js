const mongoose = require("mongoose");

exports.connectDb = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    if (connection.STATES.connecting) {
      console.log(`Connected to MongoDB ${connection.connection.host}`);
    }

    if (connection.STATES.connected) {
      console.log(`Connected to MongoDB`);
    }

    if (connection.STATES.disconnected) {
      console.log(`Disconnected from MongoDB ${connection.connection.host}`);
    }
  } catch (error) {
    console.log("Error connecting to MongoDB", error);
  }
};
