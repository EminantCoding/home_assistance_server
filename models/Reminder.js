const mongoose = require("mongoose");

const ReminderSchema = new mongoose.Schema({
  asset_name: { type: mongoose.Schema.Types.ObjectId, ref: "asset" },
  type: { type: Number, required: true },
  occurance: { type: Number },
  reminder_date: { type: Date },
  description: { type: String },
  created_date: { type: Date, default: Date.now },
  status: { type: Boolean },
});
module.exports = Reminder = mongoose.model("reminder", ReminderSchema);
