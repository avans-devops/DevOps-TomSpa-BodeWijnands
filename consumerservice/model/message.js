const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  msg: String
});

mongoose.model("message", messageSchema);
