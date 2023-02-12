const express = require("express");
const router = express.Router();
const config = require("config");
const { check, validationResult } = require("express-validator");

const PropertyTax = require("../../models/PropertyTax");

// @route  GET api/propertyTax
// @desc   propertyTax route
// @access public
router.get("/", async (req, res) => {
  try {
    const propertyTaxes = await PropertyTax.find();
    res.json(propertyTaxes);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// @route  POST api/propertyTax
// @desc   propertyTax route
// @access public
router.post(
  "/",
  [
    check("asset_name", "Asset Name is Required").not().isEmpty(),
    check("tax_type", "Please include a  Tax Type").not().isEmpty(),
    check("tax_paid_date", "Please include a  Tax Paid Date").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const {
        asset_name,
        tax_type,
        tax_paid_date,
        tax_amount,
        tax_due_date,
        transaction_mode,
        status,
        remarks,
      } = req.body;

      let postPropertyTax = {};
      if (asset_name) postPropertyTax.asset_name = asset_name;
      if (tax_type) postPropertyTax.tax_type = tax_type;
      if (tax_paid_date) postPropertyTax.tax_paid_date = tax_paid_date;
      if (tax_amount) postPropertyTax.tax_amount = tax_amount;
      if (tax_due_date) postPropertyTax.tax_due_date = tax_due_date;
      if (transaction_mode) postPropertyTax.transaction_mode = transaction_mode;
      if (status) postPropertyTax.status = status;
      if (remarks) postPropertyTax.remarks = remarks;

      postPropertyTax = new PropertyTax(postPropertyTax);
      await postPropertyTax.save();
      res.json(postPropertyTax);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route  PUT api/propertyTax/:propertyTaxId
// @desc   PUT current propertyTax
// @access priavte
router.put(
  "/:propertyTaxId",
  [
    check("asset_name", "Asset Name is Required").not().isEmpty(),
    check("tax_type", "Please include a  Tax Type").not().isEmpty(),
    check("tax_paid_date", "Please include a  Tax Paid Date").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      asset_name,
      tax_type,
      tax_paid_date,
      tax_amount,
      tax_due_date,
      transaction_mode,
      status,
      remarks,
    } = req.body;

    try {
      const putPropertyTax = {};
      if (asset_name) putPropertyTax.asset_name = asset_name;
      if (tax_type) putPropertyTax.tax_type = tax_type;
      if (tax_paid_date) putPropertyTax.tax_paid_date = tax_paid_date;
      if (tax_amount) putPropertyTax.tax_amount = tax_amount;
      if (tax_due_date) putPropertyTax.tax_due_date = tax_due_date;
      if (transaction_mode) putPropertyTax.transaction_mode = transaction_mode;
      if (status) putPropertyTax.status = status;
      if (remarks) putPropertyTax.remarks = remarks;

      const result = await PropertyTax.updateOne(
        { _id: req.params.propertyTaxId },
        { $set: putPropertyTax }
      );
      res.json(result);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route  DELETE api/propertyTax/:propertyTaxId
// @desc   Delete propertyTax
// @access private

router.delete("/:propertyTaxId", async (req, res) => {
  try {
    try {
      // See if property Tax exists
      let propertyTax = await PropertyTax.findOne({
        _id: req.params.propertyTaxId,
      });
      if (propertyTax) {
        const propertyTax = await PropertyTax.findByIdAndDelete({
          _id: req.params.propertyTaxId,
        });
        res.json(propertyTax);
      } else {
        res.status(400).json("Record Does Not Exist...!");
      }
    } catch (err) {
      console.error(err.message);
      res.status(400).json("Record Does Not Exist...!");
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Server Error");
  }
});

module.exports = router;
