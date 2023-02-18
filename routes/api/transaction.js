const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const Transaction = require("../../models/Transaction");

// @route  GET api/transaction
// @desc   transaction route
// @access public
router.get("/", async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.json(transactions);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// @route  POST api/transaction
// @desc   transaction route
// @access public
router.post(
  "/",
  [
    check("asset_name", "Asset Name is Required").not().isEmpty(),
    check("transaction_type", "Transaction Type is Required").not().isEmpty(),
    check("amount", "Amount is Required").not().isEmpty(),
    check("paid_date", "Payment Date is Required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      asset_name,
      description,
      transaction_type,
      amount,
      paid_date,
      rent_due_date,
      transaction_mode,
      paid_by,
      paid_to,
      status,
      remarks,
    } = req.body;
    try {
      let postTransaction = {};
      if (asset_name) postTransaction.asset_name = asset_name;
      if (description) postTransaction.description = description;
      if (transaction_type) postTransaction.transaction_type = transaction_type;
      if (amount) postTransaction.amount = amount;
      if (paid_date) postTransaction.paid_date = paid_date;
      if (rent_due_date) postTransaction.rent_due_date = rent_due_date;
      if (transaction_mode) postTransaction.transaction_mode = transaction_mode;
      if (paid_by) postTransaction.paid_by = paid_by;
      if (paid_to) postTransaction.paid_to = paid_to;
      if (status) postTransaction.status = status;
      if (remarks) postTransaction.remarks = remarks;

      postTransaction = new Transaction(postTransaction);
      await postTransaction.save();
      res.json(postTransaction);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route  PUT api/transaction/:transactionId
// @desc   PUT current transaction
// @access priavte
router.put(
  "/:transactionId",
  [
    check("asset_name", "Asset Name is Required").not().isEmpty(),
    check("transaction_type", "Transaction Type is Required").not().isEmpty(),
    check("amount", "Amount is Required").not().isEmpty(),
    check("paid_date", "Payment Date is Required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      asset_name,
      description,
      transaction_type,
      amount,
      paid_date,
      rent_due_date,
      transaction_mode,
      paid_by,
      paid_to,
      status,
      remarks,
    } = req.body;

    try {
      Transaction.countDocuments(
        { _id: req.params.transactionId },
        async function (err, count) {
          if (count > 0) {
            let putTransaction = {};
            if (asset_name) putTransaction.asset_name = asset_name;
            if (description) putTransaction.description = description;
            if (transaction_type)
              putTransaction.transaction_type = transaction_type;
            if (amount) putTransaction.amount = amount;
            if (paid_date) putTransaction.paid_date = paid_date;
            if (rent_due_date) putTransaction.rent_due_date = rent_due_date;
            if (transaction_mode)
              putTransaction.transaction_mode = transaction_mode;
            if (paid_by) putTransaction.paid_by = paid_by;
            if (paid_to) putTransaction.paid_to = paid_to;
            if (status) putTransaction.status = status;
            if (remarks) putTransaction.remarks = remarks;
            const result = await Transaction.updateOne(
              { _id: req.params.transactionId },
              { $set: putTransaction }
            );
            res.json(result);
          } else {
            res.status(400).json("Record Does Not Exist...!!");
          }
        }
      );
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
  }
);

// @route  DELETE api/transaction/:transactionId
// @desc   Delete transaction
// @access private

router.delete("/:transactionId", async (req, res) => {
  try {
    Transaction.countDocuments(
      { _id: req.params.transactionId },
      async function (err, count) {
        if (count > 0) {
          const transaction = await Transaction.findByIdAndDelete({
            _id: req.params.transactionId,
          });
          res.json(transaction);
        } else {
          res.status(400).json("Record Does Not Exist...!!");
        }
      }
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Server Error");
  }
});

module.exports = router;
