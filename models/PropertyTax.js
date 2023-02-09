const mongoose = require("mongoose");

const PropertyTaxSchema = new mongoose.Schema({
  asset_name: { type: mongoose.Schema.Types.ObjectId, ref: "asset" },
  tax_type: { type: Number, required: true },
  tax_paid_date: { type: Date },
  tax_amount: { type: Number, required: true },
  tax_due_date: { type: Date },
  leaving_date: { type: Date },
  transaction_mode: { type: Number },
  status: { type: String },
  remarks: { type: String },
});
module.exports = PropertyTax = mongoose.model(
  "property_tax",
  PropertyTaxSchema
);
