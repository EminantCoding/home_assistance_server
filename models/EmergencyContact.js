const mongoose = require("mongoose");

const EmergencyContactSchema = new mongoose.Schema({
  asset_name: { type: mongoose.Schema.Types.ObjectId, ref: "asset" },
  contact_name: { type: String, required: true },
  contact_number: { type: Number },
  occupation: { type: String },
  is_admin: { type: Boolean },
});
module.exports = EmergencyContact = mongoose.model(
  "emergency_contact",
  EmergencyContactSchema
);
