const mongoose = require("mongoose");

const javaScriptQuestions = new mongoose.Schema({
  questionText: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  answerOptions: [
    {
      answerText: {
        type: String,
        min: 1,
        max: 255,
      },
      isCorrect: {
        type: Boolean,
        min: 1,
        max: 255,
      },
    },
  ],
});

module.exports = mongoose.model("javaScriptQuestions", javaScriptQuestions);
