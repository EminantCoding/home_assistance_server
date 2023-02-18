const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const EmergencyContact = require("../../models/EmergencyContact");

// @route  GET api/emergency-contact
// @desc   emergency-contact route
// @access public
router.get("/", async (req, res) => {
  try {
    const reminders = await EmergencyContact.find();
    res.json(reminders);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// @route  POST api/emergency-contact
// @desc   emergency-contact route
// @access public
router.post(
  "/",
  [
    check("asset_name", "Asset Name is Required").not().isEmpty(),
    check("contact_name", "Contact Name is Required").not().isEmpty(),
    check("contact_number", "Contact Number is Required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { asset_name, contact_name, contact_number, occupation } = req.body;
    try {
      let postEmergencyContact = {};
      if (asset_name) postEmergencyContact.asset_name = asset_name;
      if (contact_name) postEmergencyContact.contact_name = contact_name;
      if (contact_number) postEmergencyContact.contact_number = contact_number;
      if (occupation) postEmergencyContact.occupation = occupation;

      postEmergencyContact = new EmergencyContact(postEmergencyContact);
      await postEmergencyContact.save();
      res.json(postEmergencyContact);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route  PUT api/emergency-contact/:emergencyContactId
// @desc   PUT current emergency-contact
// @access priavte
router.put(
  "/:emergencyContactId",
  [
    check("asset_name", "Asset Name is Required").not().isEmpty(),
    check("contact_name", "Contact Name is Required").not().isEmpty(),
    check("contact_number", "Contact Number is Required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { asset_name, contact_name, contact_number, occupation } = req.body;

    try {
      EmergencyContact.countDocuments(
        { _id: req.params.emergencyContactId },
        async function (err, count) {
          if (count > 0) {
            let putEmergencyContact = {};
            if (asset_name) putEmergencyContact.asset_name = asset_name;
            if (contact_name) putEmergencyContact.contact_name = contact_name;
            if (contact_number)
              putEmergencyContact.contact_number = contact_number;
            if (occupation) putEmergencyContact.occupation = occupation;

            const result = await EmergencyContact.updateOne(
              { _id: req.params.emergencyContactId },
              { $set: putEmergencyContact }
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

// @route  DELETE api/emergency-contact/:emergencyContactId
// @desc   Delete emergency contact
// @access private

router.delete("/:emergencyContactId", async (req, res) => {
  try {
    // See if reminder exists
    EmergencyContact.countDocuments(
      { _id: req.params.emergencyContactId },
      async function (err, count) {
        if (count > 0) {
          const reminder = await EmergencyContact.findByIdAndDelete({
            _id: req.params.emergencyContactId,
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
