const mongoose = require("mongoose");

const testSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: true,
    },
    png: {
      type: String,
    },
    imgs: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Test", testSchema);
