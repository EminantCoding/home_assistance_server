const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  asset_name: { type: mongoose.Schema.Types.ObjectId, ref: "asset" },
  description: { type: String },
  transaction_type: { type: Number, required: true },
  amount: { type: Number, required: true },
  paid_date: { type: Date },
  rent_due_date: { type: Date },
  transaction_mode: { type: Number },
  paid_by: { type: String },
  paid_to: { type: String },
  status: { type: Number },
  remarks: { type: String },
});
module.exports = Transaction = mongoose.model("transaction", TransactionSchema);
