const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
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
});

module.exports = mongoose.model("adminSchema", adminSchema);
