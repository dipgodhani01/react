const mongoose = require("mongoose");
const { table } = require("../config/tables");

const AdminSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "subadmin"],
      default: "subadmin",
      required: true,
    },
    isAdminLogin: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model(table.admin, AdminSchema);
