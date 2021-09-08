const router = require("express").Router();
const User = require("../model/User");
const { registerValidation, loginValidation } = require("../validation");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const verify = require("./verifyToken");
require("dotenv").config();

router.get("/registerrr", async (req, res) => {
  res.send("hello");
});

router.post("/register", async (req, res) => {
  //validate data
  const { error } = registerValidation(req.body);
  if (error) return res.send(error.details[0].message);

  //check if there is similar mail
  const sameEmail = await User.findOne({ email: req.body.email });
  if (sameEmail) return res.send("mail already in our database !");
  console.log("same mail");

  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  //create new User
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: hashedPassword,
    userName: req.body.userName,
    phoneNumber: req.body.phoneNumber,
  });
  try {
    const savedUser = await user.save();
    let registerData = { message: "user added", userData: savedUser };
    res.send(registerData);
  } catch (err) {
    res.send(err + "in add ");
    console.log("err");
  }
});

//login router
router.post("/login", async (req, res) => {
  //validate data with joi
  const { error } = loginValidation(req.body);
  if (error) return res.send(error.details[0].message);

  //check if mail is correct
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.send("email is wrong");
  console.log("email wrong");
  //check if password is correct
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.send("password is wrong");

  //create tokenKey
  let finalData = {};
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, {
    expiresIn: "59min",
  });
  finalData = { token: token, login: true, currentUser: user };
  res.header("auth-token", token).send(finalData);
});

router.post("/changepassword", verify, async (req, res) => {
  const token = req.body.token;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;

  //verify token and find the user
  const targetUser = jwt.verify(token, process.env.TOKEN_SECRET);
  const user = await User.findOne({ _id: targetUser._id });
  if (!user) return res.send("user get error");

  //check if the old password is correctly typed
  const validPass = await bcrypt.compare(oldPassword, user.password);
  if (!validPass) return res.send("password is wrong");

  //hash new password
  const salt = await bcrypt.genSalt(10);
  const hashedNewPassword = await bcrypt.hash(newPassword, salt);

  //change the old password with new passwordKey
  const UpdatedUser = await User.updateOne(
    { _id: targetUser._id },
    { password: hashedNewPassword }
  );
  if (!UpdatedUser) return res.send("error in updating user");
  res.send("password changed");
  console.log(user);
});

module.exports = router;
