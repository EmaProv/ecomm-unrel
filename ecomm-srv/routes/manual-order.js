const router = require("express").Router();
const crypto = require("crypto");

const ManualOrder = require("../models/ManualOrder");
const WarehouseProd = require("../models/WarehouseProd");

const { verifyTokenAndAdmin } = require("./token");

router.post(
  "/:sku",
  /* verifyTokenAndAdmin, */ async (req, res) => {
    const prodInWarehouse = await WarehouseProd.findOne({
      sku: req.params.sku,
      in_stock: true,
    });
    console.log(prodInWarehouse);

    try {
      const randId = crypto.randomBytes(10).toString("hex");
      const newManualOrder = new ManualOrder({
        order_id: randId,
        warehouse_id: prodInWarehouse.warehouse_id,
        sku: prodInWarehouse.sku,
        sale_price: req.body.sale_price,
        size: prodInWarehouse.size,
      });

      console.log(newManualOrder);
      await newManualOrder.save();
      res.status(201).send(newManualOrder);
    } catch (err) {
      if (err.name === "MongoServerError" && err.code === 11000) {
        console.log(
          "[WARN] Order randId already exists, generating a new one..."
        );
        const suffixId = crypto.randomBytes(1).toString("hex");
        const correctId = randId + suffixId;
        const newManualOrder = new ManualOrder({
          order_id: correctId,
          warehouse_id: prodInWarehouse.warehouse_id,
          sku: prodInWarehouse.sku,
          pid: prodInWarehouse.pid,
          sale_price: req.body.sale_price,
          size: prodInWarehouse.size,
          shipping_link: req.body.shipping_link,
        });

        console.log("[ACTION] Corrected manual order Id and saved product.");
        await newManualOrder.save();
      } else {
        console.log(err);
      }
    }
  }
);

router.put(
  "/:id",
  /* verifyTokenAndAdmin, */ async (req, res) => {
    try {
      const updManualOrder = await ManualOrder.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );

      res.status(200).json(updManualOrder);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
);

router.get(
  "/",
  /* verifyTokenAndAdmin, */ async (req, res) => {
    try {
      let manualOrders;
      manualOrders = await ManualOrder.find();

      res.status(200).send(manualOrders);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
);

module.exports = router;
