const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = new schema({
  roleId: {
    type: Number,
    required: true,
  },
  empCode: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: {
    type: String,
    required: true,
    createIndexes: { unique: true },
  },
  designation: { type: String, required: true },
  password: { type: String, required: true },
  confirmPassword: { type: String, required: true },
  workPhoneNumber: { type: String },
  homePhoneNumber: { type: String },
  mobilePhoneNumber: { type: String },
  teamUid: {
    type: String
  },
  externalLoginId: { 
    type: String, 
  },
  workHours: {
    type: Object,
    default: {
      monday: {
        start: "09:00",
        end: "17:00",
        workingMins: 480,
        isEnabled: true,
      },
      tuesday: {
        start: "09:00",
        end: "17:00",
        workingMins: 480,
        isEnabled: true,
      },
      wednesday: {
        start: "09:00",
        end: "17:00",
        workingMins: 480,
        isEnabled: true,
      },
      thursday: {
        start: "09:00",
        end: "17:00",
        workingMins: 480,
        isEnabled: true,
      },
      friday: {
        start: "09:00",
        end: "17:00",
        workingMins: 480,
        isEnabled: true,
      },
      saturday: { workingMins: null, isEnabled: false },
      sunday: { workingMins: null, isEnabled: false } 
    },
  },
  sendWelcomeEmail: { type: Boolean, default: false },
});

const userSchemaModel = mongoose.model("userSchema", userSchema);
module.exports = userSchemaModel;
