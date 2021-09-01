const router = require("express").Router();
const JavaScriptQuestions = require("../model/javaScriptQuestions");
const PythonQuestions = require("../model/pythonQuestions");
const ReligionQuestions = require("../model/religionQuestions");
const GeneralCultureQuestions = require("../model/GeneralCultureQuestions");

const { registerValidation, loginValidation } = require("../validation");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const verify = require("./verifyToken");
require("dotenv").config();

//javascript add and get data

//add
router.post("/question/add/javascript", async (req, res) => {
  const question = new JavaScriptQuestions({
    questionText: req.body.questionText,
    answerOptions: req.body.answerOption,
  });

  const questionAlready = await JavaScriptQuestions.findOne({
    questionText: req.body.questionText,
  });
  if (questionAlready)
    return res.send("question already added , add a new question");

  try {
    const savedQuestion = await question.save();
    let registerData = { message: "user added", savedQuestion: savedQuestion };
    res.send(registerData);
  } catch (err) {
    res.send(err);
    console.log(err);
  }
});
router.get("/question/get/javascript", async (req, res) => {
  const allQuestions = await JavaScriptQuestions.find();
  res.send(allQuestions);
});

router.post("/question/add/python", async (req, res) => {
  const question = new PythonQuestions({
    questionText: req.body.questionText,
    answerOptions: req.body.answerOption,
  });
  const questionAlready = await JavaScriptQuestions.findOne({
    questionText: req.body.questionText,
  });
  if (questionAlready)
    return res.send("question already added , add a new question");

  try {
    const savedQuestion = await question.save();
    let registerData = { message: "user added", savedQuestion: savedQuestion };
    res.send(registerData);
  } catch (err) {
    res.send(err + "in add ");
    console.log(err);
  }
});

router.get("/question/get/python", async (req, res) => {
  const allQuestions = await PythonQuestions.find();
  res.send(allQuestions);
});

router.post("/question/add/religion", async (req, res) => {
  const question = new ReligionQuestions({
    questionText: req.body.questionText,
    answerOptions: req.body.answerOption,
  });
  const questionAlready = await JavaScriptQuestions.findOne({
    questionText: req.body.questionText,
  });
  if (questionAlready)
    return res.send("question already added , add a new question");

  try {
    const savedQuestion = await question.save();
    let registerData = { message: "user added", savedQuestion: savedQuestion };
    res.send(registerData);
  } catch (err) {
    res.send(err + "in add ");
    console.log(err);
  }
});

router.post("/question/add/generalculture", async (req, res) => {
  const question = new GeneralCultureQuestions({
    questionText: req.body.questionText,
    answerOptions: req.body.answerOption,
  });
  const questionAlready = await JavaScriptQuestions.findOne({
    questionText: req.body.questionText,
  });
  if (questionAlready)
    return res.send("question already added , add a new question");

  try {
    const savedQuestion = await question.save();
    let registerData = { message: "user added", savedQuestion: savedQuestion };
    res.send(registerData);
  } catch (err) {
    res.send(err + "in add ");
    console.log(err);
  }
});
module.exports = router;
