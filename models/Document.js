const mongoose = require("mongoose");

const DocumentSchema = new mongoose.Schema({
  asset_name: { type: mongoose.Schema.Types.ObjectId, ref: "asset" },
  file_title: { type: String, required: true },
  file_type: { type: Number },
  file_link: { type: String },
  file_description: { type: String },
  created_date: { type: Date, default: Date.now },
});
module.exports = Document = mongoose.model("document", DocumentSchema);
