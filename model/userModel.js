const mongoose = require("mongoose");
const userschema = mongoose.Schema({
  name: String,
  email: String,
  gender: String,
  password: String,
  age: Number,
  city: String,
});

const userModel = mongoose.model("users", userschema);

module.exports = { userModel };
// name ==> String
// email ==> String
// gender ==> String
// password ==> String
// age ==> Number
// city ==> String
