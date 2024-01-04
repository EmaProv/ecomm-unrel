const mongoose = require("mongoose");

const lightProductSchema = new mongoose.Schema(
  {
    sku: {
      type: String,
      required: true,
      unique: true,
    },
    pid: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    model: {
      type: String,
      required: true,
    },
    colorway: {
      type: String,
      required: true,
    },
    category: {
      type: String,
    },
    brand: {
      type: String,
      required: true,
    },
    gen: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    in_stock: {
      type: Boolean,
      default: false,
    },
    wh_q: {
      type: Number,
      required: true,
      default: 0,
    },
    tags: {
      type: Array,
      required: true,
    },
    png: {
      type: String,
      require: true,
    },
    hot_rel: {
      type: Boolean,
      default: false,
    },
    led_wall: {
      type: Boolean,
      default: false,
    },
    led_wall_slug: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("LightProduct", lightProductSchema);
