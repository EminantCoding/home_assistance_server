const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  roleid: { type: Number, required: true },
  mobile: { type: Number },
  createddate: { type: Date, default: Date.now },
});
module.exports = User = mongoose.model("user", UserSchema);
