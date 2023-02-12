const express = require("express");
const router = express.Router();
const config = require("config");
const { check, validationResult } = require("express-validator");

const Document = require("../../models/Document");

// @route  GET api/users
// @desc   users route
// @access public
router.get("/", async (req, res) => {
  try {
    const document = await Document.find();
    res.json(document);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// @route  POST api/document
// @desc   document route
// @access public
router.post(
  "/",
  [
    check("asset_name", "Asset Name is Required").not().isEmpty(),
    check("file_link", "Please include a  file link").not().isEmail(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const {
        asset_name,
        file_title,
        file_type,
        file_link,
        file_description,
        created_date,
      } = req.body;

      let postDocument = {};
      if (asset_name) postDocument.asset_name = asset_name;
      if (file_title) postDocument.file_title = file_title;
      if (file_type) postDocument.file_type = file_type;
      if (file_link) postDocument.file_link = file_link;
      if (file_description) postDocument.file_description = file_description;
      if (created_date) postDocument.created_date = created_date;

      postDocument = new Document(postDocument);
      await postDocument.save();
      res.json(postDocument);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route  PUT api/document/:documentId
// @desc   PUT current user
// @access priavte
router.put(
  "/:documentId",
  [
    check("asset_name", "Asset Name is Required").not().isEmpty(),
    check("file_title", "Please include a  File Title").not().isEmpty(),
    check("file_link", "Please include a  File link").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      asset_name,
      file_title,
      file_type,
      file_link,
      file_description,
      created_date,
    } = req.body;

    try {
      const putDocuemt = {};
      if (asset_name) putDocuemt.asset_name = asset_name;
      if (file_title) putDocuemt.file_title = file_title;
      if (file_type) putDocuemt.file_type = file_type;
      if (file_link) putDocuemt.file_link = file_link;
      if (file_description) putDocuemt.file_description = file_description;
      if (created_date) putDocuemt.created_date = created_date;

      const result = await Document.updateOne(
        { _id: req.params.documentId },
        { $set: putDocuemt }
      );
      res.json(result);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route  DELETE api/document/:documentId
// @desc   Delete user
// @access private

router.delete("/:documentId", async (req, res) => {
  try {
    try {
      // See if property Tax exists
      let document = await Document.findOne({
        _id: req.params.documentId,
      });
      if (document) {
        const document = await Document.findByIdAndDelete({
          _id: req.params.documentId,
        });
        res.json(document);
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
