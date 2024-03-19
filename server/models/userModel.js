const { default: mongoose } = require("mongoose");

const userschema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  orderInCart: {
    type: [String],
    default: [],
  },
  orderPlaced: {
    type: [String],
    default: [],
  },
});

const myuser = mongoose.model("users", userschema);

module.exports = { myuser };
