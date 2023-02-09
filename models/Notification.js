const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema({
  asset_name: { type: mongoose.Schema.Types.ObjectId, ref: "asset" },
  notification_type: { type: Number, required: true },
  description: { type: String },
  created_date: { type: Date, default: Date.now },
  status: { type: Boolean },
});
module.exports = Notification = mongoose.model(
  "notification",
  NotificationSchema
);
