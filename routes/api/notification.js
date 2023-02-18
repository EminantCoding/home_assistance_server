const express = require("express");
const router = express.Router();
const config = require("config");
const { check, validationResult } = require("express-validator");

const Notification = require("../../models/Notification");

// @route  GET api/notification
// @desc   notification route
// @access public
router.get("/", async (req, res) => {
  try {
    const notifications = await Notification.find();
    res.json(notifications);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// @route  POST api/notification
// @desc   notification route
// @access public
router.post(
  "/",
  [
    check("asset_name", "Asset Name is Required").not().isEmpty(),
    check("notification_type", "Notification Type is Required").not().isEmpty(),
    check("status", "Status is Required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { asset_name, notification_type, description, status } = req.body;

      let postNotification = {};
      if (asset_name) postNotification.asset_name = asset_name;
      if (notification_type)
        postNotification.notification_type = notification_type;
      if (description) postNotification.description = description;
      if (status) postNotification.status = status;

      postNotification = new Notification(postNotification);
      await postNotification.save();
      res.json(postNotification);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route  PUT api/notification/:notificationId
// @desc   PUT current notification
// @access priavte
router.put(
  "/:notificationId",
  [
    check("asset_name", "Asset Name is Required").not().isEmpty(),
    check("notification_type", "Notification Type is Required").not().isEmpty(),
    check("status", "Status is Required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { asset_name, notification_type, description, status } = req.body;

    try {
      Notification.countDocuments(
        { _id: req.params.notificationId },
        async function (err, count) {
          if (count > 0) {
            const putNotification = {};
            if (asset_name) putNotification.asset_name = asset_name;
            if (notification_type)
              putNotification.notification_type = notification_type;
            if (description) putNotification.description = description;
            if (status) putNotification.status = status;

            const result = await Notification.updateOne(
              { _id: req.params.notificationId },
              { $set: putNotification }
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

// @route  DELETE api/notification/:notificationId
// @desc   Delete notification
// @access private

router.delete("/:notificationId", async (req, res) => {
  try {
    Notification.countDocuments(
      { _id: req.params.notificationId },
      async function (err, count) {
        if (count > 0) {
          const notification = await Notification.findByIdAndDelete({
            _id: req.params.notificationId,
          });
          res.json(notification);
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
