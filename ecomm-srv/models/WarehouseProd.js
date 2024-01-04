const mongoose = require("mongoose");

const warehouseProductSchema = new mongoose.Schema(
  {
    warehouse_id: {
      type: String,
      required: true,
      unique: true,
    },
    sku: {
      type: String,
      required: true,
    },
    pid: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
    order_id: {
      type: String,
      default: null,
    },
    date_sale: {
      type: Date,
      default: null,
    },
    sale_price: {
      type: Number,
      default: null,
    },
    in_stock: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("WarehouseProd", warehouseProductSchema);
