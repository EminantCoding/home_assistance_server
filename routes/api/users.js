const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const config = require("config");
const { check, validationResult } = require("express-validator");

const User = require("../../models/Users");

// @route  GET api/users
// @desc   users route
// @access public
router.get("/", async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// @route  POST api/users
// @desc   Users route
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
        name,
        password,
        email,
        roleid,
        mobile,
        created_date,
        tenant_agreement,
      } = req.body;

      // See if user exists
      let user = await User.findOne({ email });
      if (user) {
        res.status(400).json({ errors: [{ message: "User Already Exists" }] });
      }
      const postUser = {};
      if (name) postUser.name = name;
      if (password) postUser.password = password;
      if (password) postUser.displaypassword = password;
      if (email) postUser.email = email;
      if (roleid) postUser.roleid = roleid;
      if (mobile) postUser.mobile = mobile;
      if (created_date) postUser.created_date = created_date;
      if (tenant_agreement) postUser.tenant_agreement = tenant_agreement;

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

// @route  PUT api/user/:userId
// @desc   PUT current user
// @access priavte
router.put(
  "/:userId",
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
    const {
      name,
      password,
      email,
      roleid,
      mobile,
      created_date,
      tenant_agreement,
    } = req.body;

    try {
      const putUser = {};
      if (name) putUser.name = name;
      if (password) putUser.displaypassword = password;
      if (email) putUser.email = email;
      if (roleid) putUser.roleid = roleid;
      if (mobile) putUser.mobile = mobile;
      if (created_date) putUser.created_date = created_date;
      if (tenant_agreement) putUser.tenant_agreement = tenant_agreement;

      const salt = await bcrypt.genSalt(10);
      putUser.password = await bcrypt.hash(password, salt);

      const result = await User.updateOne(
        { _id: req.params.userId },
        { $set: putUser }
      );
      res.json(result);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route  DELETE api/user/:userId
// @desc   Delete user
// @access private
router.delete("/:userId", async (req, res) => {
  try {
    try {
      // See if user exists
      let user = await User.findOne({ _id: req.params.userId });
      if (user) {
        const user = await User.findByIdAndDelete({
          _id: req.params.userId,
        });
        res.json(user);
      } else {
        res.status(400).json("User Does Not Exist...!");
      }
    } catch (err) {
      console.error(err.message);
      res.status(400).json("User Does Not Exist...!");
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Server Error");
  }
});

module.exports = router;
