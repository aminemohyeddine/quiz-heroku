const router = require("express").Router();
const User = require("../model/User");
const { registerValidation, loginValidation } = require("../validation");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const verify = require("./verifyToken");
require("dotenv").config();

//normal users routes...
//remove all users
router.post("/delete/all", async (req, res) => {
  await User.remove({});
  res.send("removed");
});

//find a user
router.post("/find/one", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  res.send(user);
});

router.post("/find/all", async (req, res) => {
  const users = await User.find({});
  res.send(users);
});

module.exports = router;
