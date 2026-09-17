const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Group name is required"],
      trim: true,
      minlength: [3, "Group name must be at least 3 characters"],
      maxlength: [50, "Group name must not exceed 50 characters"],
    },
    color: {
      type: String,
      default: "#3498db",
      match: [
        /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
        "Please provide a valid hex color",
      ],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [200, "Description must not exceed 200 characters"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Group must belong to a user"],
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Group", groupSchema);
