const User = require("../models/UserZero");

const checkUserFieldsPresent = (req) => {
  if (
    req.name === null ||
    req.name === undefined ||
    req.name === "" ||
    req.surname === null ||
    req.surname === undefined ||
    req.surname === "" ||
    req.email === null ||
    req.email === undefined ||
    req.email === "" ||
    req.username === null ||
    req.username === undefined ||
    req.username === "" ||
    req.password === null ||
    req.password === undefined ||
    req.password === ""
  ) {
    return true;
  }
};

module.exports = {
  checkUserFieldsPresent,
};
