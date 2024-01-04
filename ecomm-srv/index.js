const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

//ADMIN
const userZeroRoute = require("./routes/user-zero");
const authZeroRoute = require("./routes/auth-zero");
//ALL
const productRoute = require("./routes/product-api");
const ManualOrderRoute = require("./routes/manual-order");
//USERS
//const cartRoute = require("./routes/cart");
//const orderRoute = require("./routes/order");

dotenv.config();
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected."))
  .catch((err) => console.log(err));

//ADMIN
app.use("/api/auth-zero", authZeroRoute);
app.use("/api/users-zero", userZeroRoute);
//ALL
app.use("/api/prods", productRoute);
app.use("/api/m_order", ManualOrderRoute);
//USERS
//app.use("/api/carts", cartRoute);
//app.use("/api/orders", orderRoute);

app.listen(process.env.PORT || 5000, () => {
  console.log("Server up and running.");
});
