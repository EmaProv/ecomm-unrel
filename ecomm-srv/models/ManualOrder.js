const mongoose = require("mongoose");

const manualOrderSchema = new mongoose.Schema(
  {
    order_id: {
      type: String,
      required: true,
      unique: true,
    },
    warehouse_id: {
      type: String,
      required: true,
    },
    sku: {
      type: String,
      required: true,
      unique: true,
    },
    sale_price: {
      type: Number,
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
    date_sale: {
      type: Date,
      default: Date.now(),
    },
    shipping_link: {
      type: String,
      required: false,
      default: null,
    },
    oreder_status: {
      type: String,
      required: true,
      default: "CREATED",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ManualOrder", manualOrderSchema);
