const { validationResult } = require("express-validator");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");

exports.createUser = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  const { name, email, password } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (user) {
        return res.json({ errors: [{ msg: "User already registerd" }] });
      }

      bcrypt.genSalt(10).then((salt) => {
        bcrypt.hash(password, salt).then((hashedPassword) => {
          var url = gravatar.url(email, { s: "200", r: "pg", d: "mm" });
          user = new User({
            name,
            email,
            password: hashedPassword,
            avatar: url,
          });

          user.save();

          const payload = {
            id: user._id,
          };

          var token = jwt.sign({ payload, ita: 600000 }, "myKey");

          return res.status(200).json({
            token,
          });
        });
      });
    })
    .catch((err) => {
      return null;
    });
};
