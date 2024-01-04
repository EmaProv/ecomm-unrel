const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
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
    sizes: {
      type: Array,
      required: false,
    },
    priceRetail: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    in_stock: {
      type: Boolean,
      default: false,
    },
    desc: {
      type: String,
      required: true,
    },
    tags: {
      type: Array,
      required: true,
    },
    png: {
      type: String,
      require: true,
    },
    pdf: {
      type: String,
      require: false,
    },
    images: [
      {
        type: String,
      },
    ],
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

module.exports = mongoose.model("Product", productSchema);
