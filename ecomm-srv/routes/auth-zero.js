const router = require("express").Router();
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

const User = require("../models/UserZero");

//SINGIN
router.post("/v1/signin", async (req, res) => {
  try {
    //LOGIN CON USER O EMAIL - LIMITARE L'INSERIMENTO DEI CARATTERI SPECIALI PER USERNAME
    function containsSpecialChars(str) {
      const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
      return specialChars.test(str);
    }

    var user;
    if (containsSpecialChars(req.body.username)) {
      var user = await User.findOne({ email: req.body.username });
    } else {
      var user = await User.findOne({ username: req.body.username });
    }

    if (!user) {
      res.status(401).json({ msg: "User not found." });
    } else if (
      req.body.password === null ||
      req.body.password === undefined ||
      req.body.password === ""
    ) {
      res.status(401).json({ msg: "Insert a valid Password." });
    } else {
      const hashPass = CryptoJS.AES.decrypt(
        user.password,
        process.env.CRYPT_SC
      );
      const customKey = hashPass.toString(CryptoJS.enc.Utf8);

      if (customKey !== req.body.password) {
        res.status(401).json({ msg: "Wrong Password." });
      } else {
        const accessToken = jwt.sign(
          {
            id: user._id,
            isAdmin: user.isAdmin,
            isMgr: user.isMgr,
            isSudo: user.isSudo,
          },
          process.env.JWT_SC,
          { expiresIn: "30d" }
          //TODO
          //Studiare logica per controllare token per acquisti!!
          //Controllare scadenza TK
        );

        const { password, ...rest } = user._doc;
        const userId = rest._id;
        const sudo = rest.isSudo;
        const mgr = rest.isMgr;
        const adm = rest.isAdmin;
        let logInDate = Date.now();

        //rimuovere token dal messaggio, più avanti rimuovere proprio il messaggio
        console.log(
          `User loggedin ~ ID: ${userId} ~ TK: ${accessToken} ~ ${logInDate}`
        );
        res.status(201).json({ userId, accessToken, adm, sudo, mgr });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
