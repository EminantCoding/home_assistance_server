const mongoose = require("mongoose");

const AssetSchema = new mongoose.Schema({
  asset_name: { type: String, required: true },
  registered_to: { type: String },
  registered_date: { type: Date },
  address: { type: String },
  land_tax_amount: { type: Number },
  created_date: { type: Date, default: Date.now },
  features: {
    number_of_doors: { type: Number },
    number_of_windows: { type: Number },
    number_of_taps: { type: Number },
    number_of_fans: { type: Number },
    number_of_bulbs: { type: Number },
    has_sump: { type: Boolean },
    is_rented: { type: Boolean },
  },
  remarks: { type: String },
  asset_account_number: { type: String },
  asset_rr_number: { type: String },
});
module.exports = Asset = mongoose.model("asset", AssetSchema);
