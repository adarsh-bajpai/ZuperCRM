const mongoose = require("mongoose");

const connectivity = async () => {
  try {
    await mongoose.connect(`mongodb://localhost:27017/zuper`);
    console.log("Database connected!");
  } catch (error) {
    console.log("Error in connection database");
  }
};

module.exports = connectivity;
