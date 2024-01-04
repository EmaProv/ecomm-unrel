const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SC, (err, user) => {
      if (err) res.status(403).json("Not valid Token!");
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("You must login!");
  }
};

const verifyTokenAndUser = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isSudo) {
      next();
    } else {
      res.status(403).json("Insufficient privileges.");
    }
  });
};

const verifyTokenAndAuth = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isSudo) {
      next();
    } else {
      res.status(403).json("Insufficient privileges.");
    }
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin || req.user.isSudo) {
      next();
    } else {
      res.status(403).json("Insufficient privileges.");
    }
  });
};

const verifyTokenAndMgr = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isMgr || req.user.isSudo) {
      next();
    } else {
      res.status(403).json("Insufficient privileges.");
    }
  });
};

const verifyTokenAndSudo = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isSudo) {
      next();
    } else {
      res.status(403).json("Insufficient privileges.");
    }
  });
};

module.exports = {
  verifyToken,
  verifyTokenAndUser,
  verifyTokenAndAuth,
  verifyTokenAndAdmin,
  verifyTokenAndMgr,
  verifyTokenAndSudo,
};
