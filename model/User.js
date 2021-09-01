const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    min: 3,
    max: 255,
  },
  lastName: {
    type: String,
    required: true,
    min: 4,
    max: 255,
  },
  email: {
    type: String,
    require: true,
    max: 1024,
    min: 6,
  },
  password: {
    type: String,
    require: true,
    max: 1024,
    min: 6,
  },
  userName: {
    type: String,
    require: true,
    max: 1024,
    min: 6,
  },
  phoneNumber: {
    type: String,
    require: true,
    max: 1024,
    min: 6,
  },
  registerTime: {
    type: Date,
    default: Date.now,
  },
  firstGame: {
    type: Date,
  },
  lastGame: {
    type: Date,
  },
  allGames: [
    {
      gameScore: {
        type: Number,
        required: false,
        min: 6,
        max: 255,
      },
      totalOfQuestions: {
        type: Number,
        required: false,
        min: 6,
        max: 255,
      },
      percOfGame: {
        type: Number,
        required: false,
        min: 6,
        max: 255,
        default: 0,
      },
      categoryPlayed: {
        type: String,
        required: false,
        min: 6,
        max: 255,
        default: 0,
      },
    },
  ],
});

module.exports = mongoose.model("user", userSchema);
