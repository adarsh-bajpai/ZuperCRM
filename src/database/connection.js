const mongoose = require("mongoose");

const connectivity = async () => {
  try {
    await mongoose.connect(process.env.DATABASE);
    console.log("Database connected!");
  } catch (error) {
    console.error("Error in connection database");
  }
};

module.exports = connectivity;
