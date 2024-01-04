const router = require("express").Router();
const CryptoJS = require("crypto-js");

const {
  verifyTokenAndAdmin,
  verifyTokenAndMgr,
  verifyTokenAndSudo,
  verifyTokenAndAuth,
} = require("./token");
const { checkUserFieldsPresent } = require("../utils/user-zer-utils");

const User = require("../models/UserZero");

//meth: POST
//auth: MGR/SUDO
//desc: create a new admin
router.post("/create", verifyTokenAndMgr, async (req, res) => {
  try {
    if (checkUserFieldsPresent(req.body)) {
      res.status(401).json({ msg: "Complete all fields!" });
    } else if (await User.findOne({ email: req.body.email }).limit(1)) {
      res.status(409).json({ msg: "Email already exists." });
    } else if (await User.findOne({ username: req.body.username }).limit(1)) {
      res.status(409).json({ msg: "Username already exists." });
    } else {
      const newUser = new User({
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        username: req.body.username,
        password: CryptoJS.AES.encrypt(
          req.body.password,
          process.env.CRYPT_SC
        ).toString(),
        isAdmin: req.body.isAdmin,
        isMgr: req.body.isMgr,
        isSudo: req.body.isSudo,
      });

      const savedUser = await newUser.save();
      console.log(`User successfully created ~ ID: ${savedUser._id}`);
      res.status(201).json(savedUser); //sostituire con messaggio
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//meth: PUT
//auth: USER
//desc: update user info if id = tk_id
router.put("/:id", verifyTokenAndAuth, async (req, res) => {
  try {
    if (req.body.password) {
      req.body.password = CryptoJS.AES.encrypt(
        req.body.password,
        process.env.CRYPT_SC
      ).toString();
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json({ msg: `User ${updatedUser._id} has been updated.` });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//meth: DELETE
//auth: SUDO
//desc: delete admin user
router.delete(
  "/:id",
  /* verifyTokenAndSudo, */ async (req, res) => {
    try {
      let userIdDel = req.params.id;
      await User.findByIdAndDelete(userIdDel);

      console.log(`User ${userIdDel} has been deleted..`);
      res.status(200).json(`User ${userIdDel} has been deleted..`);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
);

//STATS
//meth: GET
//auth: ADMIN
//desc: get simple stats user_zero
router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
  //PAGINATION

  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  //conta nuovi utenti per ogni mese e li divide in mesi
  try {
    const data = await User.aggregate([
      {
        $match: {
          createdAt: { $gte: lastYear },
        },
      },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
//meth: GET
//auth: ADMIN
//desc: get one user_zero
router.get("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...rest } = user._doc;

    res.status(201).json(rest); //cambiare con messaggio
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//meth: GET
//auth: ADMIN
//desc: get all users_zero
router.get(
  "/",
  /* verifyTokenAndAdmin, */ async (req, res) => {
    const exportedUsers = [];
    //PAGINATION
    const query = req.query.new;
    try {
      const users = query
        ? await User.find().sort({ _id: -1 }).limit(5)
        : await User.find();

      users.map((u) => {
        const { password, ...rest } = u._doc;
        return exportedUsers.push(rest);
      });

      res.status(201).json(exportedUsers); //cambiare con messaggio
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
);

module.exports = router;
