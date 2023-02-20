const mongoose = require("mongoose");
const postschema = mongoose.Schema({
  title: String,
  body: String,
  device: String,
  no_if_comments: Number,
  userid: String,
});

const postModel = mongoose.model("post", postschema);

module.exports = { postModel };
// title ==> String
// body ==> String
// device ==> String
// no_if_comments ==> Number
