const router = require("express").Router();
const Admin = require("../model/adminUser");
const { registerValidation, loginValidation } = require("../validation");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const verify = require("./verifyToken");
require("dotenv").config();

//login router
router.post("/admin/login", async (req, res) => {
  //validate data with joi
  const { error } = loginValidation(req.body);
  if (error) return res.send(error.details[0].message);

  //check if mail is correct
  const user = await Admin.findOne({ email: req.body.email });
  if (!user) return res.send("email is wrong");

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

router.post("admin/changepassword", verify, async (req, res) => {
  const token = req.body.token;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;

  //verify token and find the user
  const targetUser = jwt.verify(token, process.env.TOKEN_SECRET);
  const admin = await Admin.findOne({ _id: targetUser._id });
  if (!admin) return res.send("user get error");

  //check if the old password is correctly typed
  const validPass = await bcrypt.compare(oldPassword, admin.password);
  if (!validPass) return res.send("password is wrong");

  //hash new password
  const salt = await bcrypt.genSalt(10);
  const hashedNewPassword = await bcrypt.hash(newPassword, salt);

  //change the old password with new passwordKey
  const UpdatedAdmin = await Admin.updateOne(
    { _id: targetUser._id },
    { password: hashedNewPassword }
  );
  if (!UpdatedUser) return res.send("error in updating user");
  res.send("password changed");
  console.log(admin);
});

router.post("/admin/changepassword", verify, async (req, res) => {
  const token = req.body.token;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;

  //verify token and find the user
  const targetAdmin = jwt.verify(token, process.env.TOKEN_SECRET);
  const admin = await Admin.findOne({ _id: targetAdmin._id });
  if (!admin) return res.send("user get error");

  //check if the old password is correctly typed
  const validPass = await bcrypt.compare(oldPassword, admin.password);
  if (!validPass) return res.send("password is wrong");

  //hash new password
  const salt = await bcrypt.genSalt(10);
  const hashedNewPassword = await bcrypt.hash(newPassword, salt);

  //change the old password with new passwordKey
  const UpdatedAdmin = await Admin.updateOne(
    { _id: targetAdmin._id },
    { password: hashedNewPassword }
  );
  if (!UpdatedAdmin) return res.send("error in updating user");
  res.send("password changed");
  console.log(admin);
});
module.exports = router;
