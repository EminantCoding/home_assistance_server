const express = require("express");
const router = express.Router();
const config = require("config");
const { check, validationResult } = require("express-validator");

const Proximity = require("../../models/Proximity");

// @route  GET api/propertyTax
// @desc   propertyTax route
// @access public
router.get("/", async (req, res) => {
  try {
    const proximities = await Proximity.find();
    res.json(proximities);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// @route  POST api/proxomity
// @desc   proxomity route
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
      const { asset_name, landmark } = req.body;

      let postProxomity = {};
      if (asset_name) postProxomity.asset_name = asset_name;
      postProxomity.landmark = {};
      if (landmark?.railway_station)
        postProxomity.landmark.railway_station = landmark.railway_station;
      if (landmark?.bus_station)
        postProxomity.landmark.bus_station = landmark.bus_station;
      if (landmark?.metro_station)
        postProxomity.landmark.metro_station = landmark.metro_station;
      if (landmark?.airport) postProxomity.landmark.airport = landmark.airport;
      if (landmark?.school_college)
        postProxomity.landmark.school_college = landmark.school_college;
      if (landmark?.hospital)
        postProxomity.landmark.hospital = landmark.hospital;
      if (landmark?.market) postProxomity.landmark.market = landmark.market;
      if (landmark?.temple) postProxomity.landmark.temple = landmark.temple;
      if (landmark?.hostel) postProxomity.landmark.hostel = landmark.hostel;

      postProxomity = new Proximity(postProxomity);
      await postProxomity.save();
      res.json(postProxomity);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route  PUT api/proximity/:proximityId
// @desc   PUT current proximity
// @access priavte
router.put(
  "/:proximityId",
  [check("asset_name", "Asset Name is Required").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { asset_name, landmark } = req.body;

    try {
      Proximity.countDocuments(
        { _id: req.params.proximityId },
        async function (err, count) {
          if (count > 0) {
            const putProxomity = {};
            if (asset_name) putProxomity.asset_name = asset_name;
            putProxomity.landmark = {};
            if (landmark?.railway_station)
              putProxomity.landmark.railway_station = landmark.railway_station;
            if (landmark?.bus_station)
              putProxomity.landmark.bus_station = landmark.bus_station;
            if (landmark?.metro_station)
              putProxomity.landmark.metro_station = landmark.metro_station;
            if (landmark?.airport)
              putProxomity.landmark.airport = landmark.airport;
            if (landmark?.school_college)
              putProxomity.landmark.school_college = landmark.school_college;
            if (landmark?.hospital)
              putProxomity.landmark.hospital = landmark.hospital;
            if (landmark?.market)
              putProxomity.landmark.market = landmark.market;
            if (landmark?.temple)
              putProxomity.landmark.temple = landmark.temple;
            if (landmark?.hostel)
              putProxomity.landmark.hostel = landmark.hostel;

            const result = await Proximity.updateOne(
              { _id: req.params.proximityId },
              { $set: putProxomity }
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

// @route  DELETE api/proximity/:proximityId
// @desc   Delete proximity
// @access private

router.delete("/:proximityId", async (req, res) => {
  try {
    Proximity.countDocuments(
      { _id: req.params.proximityId },
      async function (err, count) {
        if (count > 0) {
          const proximity = await Proximity.findByIdAndDelete({
            _id: req.params.proximityId,
          });
          res.json(proximity);
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
