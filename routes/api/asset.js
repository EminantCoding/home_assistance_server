const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const config = require("config");
const { check, validationResult } = require("express-validator");

const User = require("../../models/Users");

// @route  POST api/asset
// @desc   Test route
// @access public
router.post(
  "/",
  [
    check("name", "Name is Required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more character"
    ).isLength({ min: 6 }),
    check("roleid", "Role is Required").not().isEmpty(),
  ],
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
        mobile,
      } = req.body;

      const postAsset = {};
      if (name) postUser.name = name;
      if (password) postUser.password = password;
      if (password) postUser.displaypassword = password;
      if (email) postUser.email = email;
      if (roleid) postUser.roleid = roleid;
      if (mobile) postUser.mobile = mobile;

      user = new User(postUser);

      // Encrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();

      // Return json web token

      const payload = { user: { id: user.id } };
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
