const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  displaypassword: { type: String, required: true },
  roleid: { type: Number, required: true },
  mobile: { type: Number },
  created_date: { type: Date, default: Date.now },
  tenant_agreement: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "tenant_agreement",
  },
});
module.exports = User = mongoose.model("user", UserSchema);
