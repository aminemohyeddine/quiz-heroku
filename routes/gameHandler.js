const router = require("express").Router();
const User = require("../model/User");
const { registerValidation, loginValidation } = require("../validation");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const verify = require("./verifyToken");
require("dotenv").config();

//gamedata/...
router.post("/firstgame", async (req, res) => {
  const user = await User.findOneAndUpdate(
    { firstName: req.body.firstName },
    {
      firstGame: Date.now(),
      $push: {
        allGames: {
          gameScore: req.body.gameScore,
          totalOfQuestions: req.body.totalOfQuestions,
          percOfGame: req.body.percOfGame,
          categoryPlayed: req.body.categoryPlayed,
        },
      },
    }
  );
  res.send(user);
});

router.post("/addgame", async (req, res) => {
  const user = await User.findOneAndUpdate(
    { firstName: req.body.firstName },
    {
      lastGame: Date.now(),
      $push: {
        allGames: {
          gameScore: req.body.gameScore,
          totalOfQuestions: req.body.totalOfQuestions,
          percOfGame: req.body.percOfGame,
          categoryPlayed: req.body.categoryPlayed,
        },
      },
    }
  );
  res.send(user);
});

module.exports = router;
