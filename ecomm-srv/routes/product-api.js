const router = require("express").Router();
const multer = require("multer");
const crypto = require("crypto");

const Product = require("../models/Product");
const WarehouseProd = require("../models/WarehouseProd");

const {
  s3Upload,
  deleteProdBck,
  s3UpdateUpload,
  deleteProdFilesAfterUpd,
} = require("../service/s3Service");
const { checkProdFieldsPresent } = require("../utils/prods-utils");
const { verifyTokenAndAdmin, verifyTokenAndMgr } = require("./token");
const LightProduct = require("../models/LightProduct");

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const fileMime = file.mimetype;
  if (fileMime.split("/")[0] === "image") {
    cb(null, true);
  } else if (fileMime.split("/")[1] === "pdf") {
    cb(null, true);
  } else {
    cb(new multer.MulterError("ERR_FILE_EXT"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 1000000, files: 8 }, //check dimensione per singolo file !!
});

//CREATE PRODUCT
router.post(
  "/",
  verifyTokenAndAdmin,
  upload.array("files", 8),
  async (req, res) => {
    try {
      if (checkProdFieldsPresent(req.body)) {
        console.log(req.body);
        res.status(401).json({ msg: "Complete all fields!" });
      } else if (await Product.findOne({ sku: req.body.sku }).limit(1)) {
        res.status(409).json({ msg: "Product already exists." });
      } else if (await Product.findOne({ pid: req.body.pid }).limit(1)) {
        res.status(409).json({ msg: "Product already exists." });
      } else if (await Product.findOne({ slug: req.body.slug }).limit(1)) {
        res.status(409).json({ msg: "Product already exists." });
      } else {
        let pngAws;
        let pdfAws;
        const jpgsAws = [];
        let totWH = 0;
        //console.log(req.body);
        //console.log(req.files);

        // const fileRes = await s3Upload(req.body.slug, req.files);
        // console.log(fileRes);

        fileRes.map((i) => {
          const key = i.Key;
          if (i.Key.split(".")[1] === "png") {
            return (pngAws = key);
          } else if (i.Key.split(".")[1] === "pdf") {
            return (pdfAws = key);
          } else {
            return jpgsAws.push(key);
          }
        });

        const tags = req.body.tags.split(",").map((t) => t.trim());

        const sizeParsed = Object(JSON.parse(req.body.sizes));
        //debug postman
        //const sizeParsed = req.body.sizes;

        const ofs = sizeParsed.length > 0 ? false : true;

        const newProduct = new Product({
          sku: req.body.sku,
          pid: req.body.pid,
          slug: req.body.slug,
          model: req.body.model,
          colorway: req.body.colorway,
          category: req.body.category,
          brand: req.body.brand,
          gen: req.body.gen,
          sizes: sizeParsed,
          priceRetail: Number(req.body.priceRetail),
          price: Number(req.body.price),
          in_stock: ofs,
          desc: req.body.desc,
          tags: tags,
          png: pngAws,
          pdf: pdfAws,
          images: jpgsAws,
          hot_rel: req.body.hot_rel,
          led_wall: req.body.led_wall,
          led_wall_slug: req.body.led_wall_slug,
        });

        await newProduct.save();

        //ADD WAREHOUSE
        for (const prod of sizeParsed) {
          let sizeQuant = prod.size_q;
          totWH += sizeQuant;
          console.log("numero atteso: " + sizeQuant);

          for (let i = 1; i <= sizeQuant; i++) {
            CreateNewWarehouse(req.body.sku, req.body.pid, prod.size);
          }
        }

        //CREATE LIGHT PRODUCT
        const newLigthProduct = new LightProduct({
          sku: req.body.sku,
          pid: req.body.pid,
          slug: req.body.slug,
          model: req.body.model,
          colorway: req.body.colorway,
          category: req.body.category,
          brand: req.body.brand,
          gen: req.body.gen,
          price: Number(req.body.price),
          in_stock: ofs,
          wh_q: totWH,
          tags: tags,
          png: pngAws,
          hot_rel: req.body.hot_rel,
          led_wall: req.body.led_wall,
          led_wall_slug: req.body.led_wall_slug,
        });

        await newLigthProduct.save();

        console.log(`Added new Product! ~ Product PID: ${newProduct._id}`);
        return res
          .status(200)
          .json({ msg: `Added new Product! ~ Product PID: ${newProduct._id}` });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  }
);

//UPDATE PRODUCT
router.put(
  "/:id",
  verifyTokenAndAdmin,
  upload.array("tmpFiles", 8),
  async (req, res) => {
    try {
      /* if (req.files) {
        console.log(req.files);
      } */

      let newPng;
      let newPdf;
      const toSaveImgs = [];
      const toDelFiles = [];

      const prevProd = await Product.findById(req.params.id);

      const prevImgs = prevProd.images;
      const reqImgs = req.body.images;

      //arrMongo - arrReq = toDelete
      prevImgs.filter((i) => {
        if (reqImgs) {
          if (reqImgs.includes(i)) {
            toSaveImgs.push(i);
          } else {
            toDelFiles.push(i);
          }
        } else {
          toDelFiles.push(i);
        }
      });

      //upload imgs to aws
      console.log(req.body);
      let needPng = req.body.png === "null" ? true : false;
      let needPdf = req.body.pdf === "null" ? true : false;
      if (req.files && req.files.length > 0) {
        // const fileRes = await s3UpdateUpload(
        //   req.body.slug,
        //   req.files,
        //   needPng,
        //   needPdf
        // );

        fileRes.forEach((i) => {
          const key = i.Key;
          if (i.Key.split(".")[1] === "png" && req.body.png === "null") {
            newPng = key;
          } else if (i.Key.split(".")[1] === "pdf" && req.body.pdf === "null") {
            newPdf = key;
          } else {
            toSaveImgs.push(key);
          }
        });
      }

      // if (toDelFiles.length > 0) {
      //   deleteProdFilesAfterUpd(req.body.slug, toDelFiles);
      // }

      //Check sizes prod
      let updWHQ = 0;
      const updSizes = [];
      const prevSizes = prevProd.sizes;
      const sizeUpdParsed = Object(JSON.parse(req.body.sizes));

      if (req.body.sizes) {
        for (let i = 0; i < prevSizes.length; i++) {
          let prevSize = prevSizes[i].size;
          let prevSizeQ = prevSizes[i].size_q;
          for (let j = 0; j < sizeUpdParsed.length; j++) {
            let newSize = sizeUpdParsed[j].size;
            let newSizeQ = sizeUpdParsed[j].size_q;

            if (newSize !== "" && newSizeQ !== "") {
              if (!prevSizes.some((s) => s.size === newSize)) {
                updSizes.push(sizeUpdParsed[j]);
                updWHQ += newSizeQ;

                //crea warehouse
                for (let i = 1; i <= newSizeQ; i++) {
                  CreateNewWarehouse(req.body.sku, req.body.pid, newSize);
                }
              } else if (newSize === prevSize && newSizeQ !== prevSizeQ) {
                updSizes.push(sizeUpdParsed[j]);
                updWHQ += newSizeQ;

                let deltaQuant = 0;
                if (newSizeQ > prevSizeQ) {
                  deltaQuant = newSizeQ - prevSizeQ;
                } else {
                  deltaQuant = prevSizeQ - newSizeQ;
                }

                console.log(deltaQuant);
                //crea warehouse
                if (deltaQuant > 0) {
                  for (let i = 1; i <= deltaQuant; i++) {
                    CreateNewWarehouse(req.body.sku, req.body.pid, newSize);
                  }
                }

                //cancella da prevSize
                prevSizes.splice(i, 1);
              }
            }
          }
        }
      }

      if (updSizes.length > 0 && prevSizes.length > 0) {
        for (let i = 0; i < prevSizes.length; i++) {
          let sku = req.body.sku;
          let size = prevSizes[i].size;
          try {
            WarehouseProd.deleteMany({
              sku: { $eq: sku },
              size: { $eq: size },
            }).then((res) => {
              if (res.deletedCount === 0) {
                console.log(
                  "No products deleted for " + sku + " and size " + size
                );
              } else {
                console.log(
                  "Deleted successfully n: " +
                    res.deletedCount +
                    " products for " +
                    sku +
                    " and size " +
                    size
                );
              }
            });
          } catch (err) {
            console.log(err);
          }
        }
      }

      const updProd = {
        slug: req.body.slug,
        model: req.body.model,
        colorway: req.body.colorway,
        category: req.body.category,
        brand: req.body.brand,
        gen: req.body.gen,
        priceRetail: req.body.priceRetail,
        price: req.body.price,
        desc: req.body.desc,
        tags: req.body.tags,
        hot_rel: req.body.hot_rel,
        led_wall: req.body.led_wall,
        led_wall_slug: req.body.led_wall_slug,
        png: req.body.png === "null" ? newPng : req.body.png,
        pdf: req.body.pdf === "null" ? newPdf : req.body.pdf,
        images: toSaveImgs,
        sizes: updSizes.length > 0 ? updSizes : sizeUpdParsed,
      };

      await Product.findByIdAndUpdate(
        req.params.id,
        {
          $set: updProd,
        },
        { new: true }
      );

      const updLightProd = {
        colorway: req.body.colorway,
        category: req.body.category,
        brand: req.body.brand,
        gen: req.body.gen,
        priceRetail: req.body.priceRetail,
        price: req.body.price,
        desc: req.body.desc,
        wh_q: updWHQ > 0 && updWHQ,
        tags: req.body.tags,
        hot_rel: req.body.hot_rel,
        led_wall: req.body.led_wall,
        led_wall_slug: req.body.led_wall_slug,
        png: req.body.png === "null" ? newPng : req.body.png,
      };

      const filter = { sku: { $eq: req.body.sku } };
      const update = { $set: updLightProd };

      await LightProduct.findOneAndUpdate(filter, update, {
        new: true,
      });

      console.log("Product updated correctly ~ Prod Id: " + req.params.id);
      return res
        .status(200)
        .json({ msg: "Product updated correctly ~ Prod Id: " + req.params.id });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  }
);

//DELETE PRODUCT
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    let prodId = req.params.id;
    let delProd = await Product.findByIdAndDelete(prodId);

    let prodBucketDir = delProd.slug;
    let prodSku = delProd.sku;

    //delete aws bucket
    // deleteProdBck(prodBucketDir);

    //cancellare lightprod
    await LightProduct.findOneAndDelete({
      sku: { $eq: prodSku },
    });
    //cancellare warehouse
    WarehouseProd.deleteMany({
      sku: { $eq: prodSku },
    }).then((res) => {
      if (res.deletedCount === 0) {
        console.log("No products deleted for " + prodSku + " in warehouse");
      } else {
        console.log(
          "Deleted successfully n: " +
            res.deletedCount +
            " products for " +
            prodSku
        );
      }
    });

    console.log(`Deleted product! ~ Product ID: ${delProd._id}`);
    res
      .status(200)
      .json({ msg: `Deleted product! ~ Product ID: ${delProd._id}` });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//GET PRODUCTS
router.get("/", async (req, res) => {
  //PAGINATION
  const qNew = req.query.new;
  const qCat = req.query.category;

  try {
    let products;
    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(5);
    } else if (qCat) {
      products = await Product.find({
        category: {
          $in: [qCat],
        },
      });
    } else {
      products = await Product.find();
    }

    res.status(200).send(products);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//DASHBOARD
router.get("/last-cop", verifyTokenAndAdmin, async (req, res) => {
  try {
    let products;
    products = await Product.find().sort({ createdAt: -1 }).limit(5);

    res.status(200).send(products);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//GET SINGLE PRODUCT
router.get("/:id", async (req, res) => {
  try {
    const prod = await Product.findById(req.params.id);
    res.status(201).send(prod);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//HANDLING ERRORS
router.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "ERR_FILE_SIZE") {
      return res.json({
        msg: "Files size limit passed!",
      });
    }

    if (err.code === "ERR_FILE_EXT") {
      return res.json({
        msg: "File must be an image!",
      });
    }

    if (err.code === "ERR_FILE_LIMIT") {
      return res.json({
        msg: "Files quantity limit passed!",
      });
    }
  }
});

//TEST ENDPOINT TO REMOVE
router.post("/test-endpoint", verifyTokenAndAdmin, async (req, res) => {
  console.log(req.user);
  try {
    /* const id = crypto.randomBytes(10).toString("hex");

    console.log(id);

    let id2 = crypto.randomBytes(1).toString("hex");
    console.log(id2);

    let finId = id + id2;
    console.log(finId);
    res.status(200).send(finId); */

    /* let id = "A000000001";

    let newId = Number(id) + 1;

    let idStr = newId.toString();
    res.status(200).send(idStr); */
    /* const maxId = await WarehouseProd.find()
      .sort({ warehouse_id: -1 })
      .limit(1);
    const projection = maxId[0].warehouse_id; */

    console.log("SUCA");
    res.status(200).send("suca");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;

const CreateNewWarehouse = (sku, pid, size) => {
  const randId = crypto.randomBytes(10).toString("hex");
  try {
    const newWarehouseProd = new WarehouseProd({
      warehouse_id: randId,
      sku: sku,
      pid: pid,
      size: size,
    });

    //console.log("taglia " + prod.size + ", item " + i);
    newWarehouseProd.save();
    //const savedWarehouseProd = await newWarehouseProd.save();
    //console.log(savedWarehouseProd);
  } catch (err) {
    if (err.name === "MongoServerError" && err.code === 11000) {
      console.log(
        "[WARN] Warehouse product randId already exists, generating a new one..."
      );
      const suffixId = crypto.randomBytes(1).toString("hex");
      const correctId = randId + suffixId;
      const newWarehouseProd = new WarehouseProd({
        warehouse_id: correctId,
        sku: sku,
        pid: pid,
        size: size,
      });

      console.log("[ACTION] Corrected warehouse product Id and saved product.");
      newWarehouseProd.save();
    } else {
      console.log(err);
    }
  }
};
