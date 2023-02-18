const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const Reminder = require("../../models/Reminder");

// @route  GET api/reminders
// @desc   reminders route
// @access public
router.get("/", async (req, res) => {
  try {
    const reminders = await Reminder.find();
    res.json(reminders);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// @route  POST api/reminder
// @desc   reminder route
// @access public
router.post(
  "/",
  [
    check("asset_name", "Asset Name is Required").not().isEmpty(),
    check("type", "Reminder Type is Required").not().isEmpty(),
    check("status", "Status is Required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { asset_name, type, occurance, reminder_date, description, status } =
      req.body;
    try {
      let postReminders = {};
      if (asset_name) postReminders.asset_name = asset_name;
      if (type) postReminders.type = type;
      if (occurance) postReminders.occurance = occurance;
      if (reminder_date) postReminders.reminder_date = reminder_date;
      if (description) postReminders.description = description;
      if (status) postReminders.status = status;

      postReminders = new Reminder(postReminders);
      await postReminders.save();
      res.json(postReminders);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route  PUT api/reminder/:reminderId
// @desc   PUT current reminder
// @access priavte
router.put(
  "/:reminderId",
  [
    check("asset_name", "Asset Name is Required").not().isEmpty(),
    check("type", "Reminder Type is Required").not().isEmpty(),
    check("status", "Status is Required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { asset_name, type, occurance, reminder_date, description, status } =
      req.body;

    try {
      Reminder.countDocuments(
        { _id: req.params.reminderId },
        async function (err, count) {
          if (count > 0) {
            let putReminders = {};
            if (asset_name) putReminders.asset_name = asset_name;
            if (type) putReminders.type = type;
            if (occurance) putReminders.occurance = occurance;
            if (reminder_date) putReminders.reminder_date = reminder_date;
            if (description) putReminders.description = description;
            if (status) putReminders.status = status;

            const result = await Reminder.updateOne(
              { _id: req.params.reminderId },
              { $set: putReminders }
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

// @route  DELETE api/proximity/:reminderId
// @desc   Delete proximity
// @access private

router.delete("/:reminderId", async (req, res) => {
  try {
    Reminder.countDocuments(
      { _id: req.params.reminderId },
      async function (err, count) {
        if (count > 0) {
          const reminder = await Reminder.findByIdAndDelete({
            _id: req.params.reminderId,
          });
          res.json(reminder);
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
