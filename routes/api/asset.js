const express = require("express");
const router = express.Router();
const config = require("config");
const { check, validationResult } = require("express-validator");

const Asset = require("../../models/Asset");

// @route  GET api/stateadminauth
// @desc   Test route
// @access public
router.get("/", async (req, res) => {
  try {
    const assets = await Asset.find();
    res.json(assets);
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
    try {
      const {
        asset_name,
        registered_to,
        registered_date,
        address,
        land_tax_amount,
        features,
        remarks,
      } = req.body;

      // See if user exists
      let asset = await Asset.findOne({ asset_name });
      if (asset) {
        res.status(400).json({ errors: [{ message: "Asset Already Exists" }] });
      } else {
        const postAsset = {};
        if (asset_name) postAsset.asset_name = asset_name;
        if (registered_to) postAsset.registered_to = registered_to;
        if (registered_date) postAsset.registered_date = registered_date;
        if (address) postAsset.address = address;
        if (land_tax_amount) postAsset.land_tax_amount = land_tax_amount;
        if (remarks) postAsset.remarks = remarks;

        postAsset.features = {};
        if (features?.number_of_doors)
          postAsset.features.number_of_doors = features.number_of_doors;
        if (features?.number_of_windows)
          postAsset.features.number_of_windows = features.number_of_windows;
        if (features?.number_of_taps)
          postAsset.features.number_of_taps = features.number_of_taps;
        if (features?.number_of_fans)
          postAsset.features.number_of_fans = features.number_of_fans;
        if (features?.number_of_bulbs)
          postAsset.features.number_of_bulbs = features.number_of_bulbs;
        if (features?.has_sump !== undefined)
          postAsset.features.has_sump = features.has_sump;
        if (features?.is_rented !== undefined) {
          postAsset.features.is_rented = features.is_rented;
        }
        asset = new Asset(postAsset);
        await asset.save();
        res.json(asset);
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route  PUT api/asset/:assetId
// @desc   PUT current asset
// @access priavte
router.put(
  "/:assetId",
  [check("asset_name", "Asset Name is Required").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      asset_name,
      registered_to,
      registered_date,
      address,
      land_tax_amount,
      features,
      remarks,
    } = req.body;

    try {
      Asset.countDocuments(
        { _id: req.params.assetId },
        async function (err, count) {
          if (count > 0) {
            const putAsset = {};
            if (asset_name) putAsset.asset_name = asset_name;
            if (registered_to) putAsset.registered_to = registered_to;
            if (registered_date) putAsset.registered_date = registered_date;
            if (address) putAsset.address = address;
            if (land_tax_amount) putAsset.land_tax_amount = land_tax_amount;
            if (remarks) putAsset.remarks = remarks;

            putAsset.features = {};
            if (features?.number_of_doors)
              putAsset.features.number_of_doors = features.number_of_doors;
            if (features?.number_of_windows)
              putAsset.features.number_of_windows = features.number_of_windows;
            if (features?.number_of_taps)
              putAsset.features.number_of_taps = features.number_of_taps;
            if (features?.number_of_fans)
              putAsset.features.number_of_fans = features.number_of_fans;
            if (features?.number_of_bulbs)
              putAsset.features.number_of_bulbs = features.number_of_bulbs;
            if (features?.has_sump !== undefined)
              putAsset.features.has_sump = features.has_sump;
            if (features?.is_rented !== undefined) {
              putAsset.features.is_rented = features.is_rented;
            }
            const result = await Asset.updateOne(
              { _id: req.params.assetId },
              { $set: putAsset }
            );
            res.json(result);
          } else {
            res.status(400).json("Record Does Not Exist...!!");
          }
        }
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route  DELETE api/asset/:assetId
// @desc   Delete asset from profile
// @access private
router.delete("/:assetId", async (req, res) => {
  try {
    Asset.countDocuments(
      { _id: req.params.assetId },
      async function (err, count) {
        if (count > 0) {
          const user = await Asset.findByIdAndDelete({
            _id: req.params.assetId,
          });
          res.json(user);
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
