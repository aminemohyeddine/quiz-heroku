const mongoose = require("mongoose");

const GeneralCultureQuestions = new mongoose.Schema({
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
        required: true,
        min: 1,
        max: 255,
      },
      isCorrect: {
        type: Boolean,
        required: true,
        min: 1,
        max: 255,
      },
    },
  ],
});

module.exports = mongoose.model(
  "GeneralCultureQuestions",
  GeneralCultureQuestions
);
