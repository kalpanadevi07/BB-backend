const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      unique: true,
      trim: true,
    },

    roles: {
      type: [String],
      required: true,
    },

    workTypes: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Lead", leadSchema);