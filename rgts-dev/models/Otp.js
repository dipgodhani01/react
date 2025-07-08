const mongoose = require("mongoose");
const { table } = require("../config/tables");

const otpSchema = new mongoose.Schema({
  type: { type: String, required: true },
  email: { type: String },
  otp: { type: String, required: true },
  expiresAt: { type: Date, required: true },
});

module.exports = mongoose.model(table.otp, otpSchema);
