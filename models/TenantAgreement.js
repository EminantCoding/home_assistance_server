const mongoose = require("mongoose");

const TenantAgreementSchema = new mongoose.Schema({
  asset_name: { type: mongoose.Schema.Types.ObjectId, ref: "asset", required: true },
  residents_count: { type: Number },
  joining_date: { type: Date },
  leaving_date: { type: Date },
  residents_name: { type: Array },
  identity_proof: { type: Array },
  advance_amount: { type: Number },
  rent_amount: { type: Number },
  rent_amount: { type: Number },
  percentage_increased: { type: String },
  contact_numbers: { type: Array },
  email: { type: String },
  rent_due_date: { type: Number },
  remarks: { type: String },
});
module.exports = TenantAgreement = mongoose.model(
  "tenant_agreement",
  TenantAgreementSchema
);
