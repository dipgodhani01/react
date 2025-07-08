const mongoose = require("mongoose");
const { Schema } = mongoose;
const { table } = require("../config/tables");

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    dialCode: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "block"],
      default: "active",
    },
    role: { type: String },
    isLogin: { type: Boolean, default: false },
    emailVerified: { type: Boolean, default: false },
    city:{type: String},
    zipcode:{type: String},
    state:{type: String},
    country:{type: String},
  },
  { timestamps: true },
  { toJSON: { virtuals: true } }
);

module.exports = mongoose.model(table.users, UserSchema);
