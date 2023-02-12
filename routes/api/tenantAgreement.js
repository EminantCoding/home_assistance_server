const express = require("express");
const router = express.Router();
const config = require("config");
const { check, validationResult } = require("express-validator");

const TenantAgreement = require("../../models/TenantAgreement");

// @route  GET api/stateadminauth
// @desc   Test route
// @access public
router.get("/", async (req, res) => {
  try {
    const tenantDeed = await TenantAgreement.find();
    res.json(tenantDeed);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// @route  POST api/asset
// @desc   Test route
// @access public
router.post(
  "/",
  [check("asset_name", "Asset Name is Required").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //   residents_count: { type: Number },
    // joining_date: { type: Date },
    // leaving_date: { type: Date },
    // residents_name: { type: Array },
    // identity_proof: { type: Array },
    // advance_amount: { type: Number },
    // rent_amount: { type: Number },
    // rent_amount: { type: Number },
    // percentage_increased: { type: String },
    // contact_numbers: { type: Array },
    // rent_due_date: { type: Number },
    // remarks: { type: String },
    try {
      const {
        asset_name,
        residents_count,
        joining_date,
        leaving_date,
        residents_name,
        identity_proof,
        advance_amount,
        rent_amount,
        percentage_increased,
        contact_numbers,
        rent_due_date,
        remarks,
      } = req.body;

      // See if user exists
      let tenantDeed = await TenantAgreement.findOne({ asset_name });
      if (tenantDeed) {
        res.status(400).json({
          errors: [
            { message: "Tenant Agreement for the asset Already Exists" },
          ],
        });
      } else {
        let tenantDeed = {};
        if (asset_name) tenantDeed.asset_name = asset_name;
        if (residents_count) tenantDeed.residents_count = residents_count;
        if (joining_date) tenantDeed.joining_date = joining_date;
        if (leaving_date) tenantDeed.leaving_date = leaving_date;
        if (residents_name) tenantDeed.residents_name = residents_name;
        if (identity_proof) tenantDeed.identity_proof = identity_proof;
        if (advance_amount) tenantDeed.advance_amount = advance_amount;
        if (rent_amount) tenantDeed.rent_amount = rent_amount;
        if (percentage_increased)
          tenantDeed.percentage_increased = percentage_increased;
        if (contact_numbers) tenantDeed.contact_numbers = contact_numbers;
        if (rent_due_date) tenantDeed.rent_due_date = rent_due_date;
        if (remarks) tenantDeed.remarks = remarks;

        tenantDeed = new TenantAgreement(tenantDeed);
        await tenantDeed.save();
        res.json(tenantDeed);
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route  PUT api/tenantAgreement/:tenantDeedId
// @desc   PUT current asset
// @access priavte
router.put(
  "/:tenantDeedId",
  [check("asset_name", "Asset Name is Required").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      asset_name,
      residents_count,
      joining_date,
      leaving_date,
      residents_name,
      identity_proof,
      advance_amount,
      rent_amount,
      percentage_increased,
      contact_numbers,
      rent_due_date,
      remarks,
    } = req.body;

    try {
      const putTenantDeed = {};
      if (asset_name) putTenantDeed.asset_name = asset_name;
      if (residents_count) putTenantDeed.residents_count = residents_count;
      if (joining_date) putTenantDeed.joining_date = joining_date;
      if (leaving_date) putTenantDeed.leaving_date = leaving_date;
      if (residents_name) putTenantDeed.residents_name = residents_name;
      if (identity_proof) putTenantDeed.identity_proof = identity_proof;
      if (advance_amount) putTenantDeed.advance_amount = advance_amount;
      if (rent_amount) putTenantDeed.rent_amount = rent_amount;
      if (percentage_increased)
        putTenantDeed.percentage_increased = percentage_increased;
      if (contact_numbers) putTenantDeed.contact_numbers = contact_numbers;
      if (rent_due_date) putTenantDeed.rent_due_date = rent_due_date;
      if (remarks) putTenantDeed.remarks = remarks;

      const result = await TenantAgreement.updateOne(
        { _id: req.params.tenantDeedId },
        { $set: putTenantDeed }
      );
      res.json(result);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route  DELETE api/tenantAgreement/:tenantDeedId
// @desc   Delete tenantAgreement
// @access private
router.delete("/:tenantDeedId", async (req, res) => {
  try {
    const tenantDeed = await TenantAgreement.findByIdAndDelete({
      _id: req.params.tenantDeedId,
    });
    res.json(tenantDeed);
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Server Error");
  }
});

module.exports = router;
