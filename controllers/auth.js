const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.isAuthenticated = (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(501).json({ msg: "User not authorized" });
  }

  jwt.verify(token, "myKey", function (err, decoded) {
    if (err) {
      return res.status(501).json({ msg: "User not authorized" });
    }
    req.user = decoded;
    next();
  });
};
exports.getAUser = (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(501).json({ msg: "User not authorized" });
  }

  jwt.verify(token, "myKey", function (err, decoded) {
    if (err) {
      return res.status(501).json({ msg: "User not authoriz ed" });
    }

    User.findById(decoded.payload.id)
      .select("-password")
      .then((user) => {
        return res.json(user);
      })
      .catch((err) => {
        console.error(err);
      });
  });
};

exports.sigin = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  const { email, password } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res
          .status(500)
          .json({ errors: [{ msg: "Invalid credentials" }] });
      }

      bcrypt.compare(password, user.password).then((result) => {
        if (!result) {
          return res
            .status(500)
            .json({ errors: [{ msg: "Invalid credentials" }] });
        }

        const payload = {
          id: user._id,
        };

        var token = jwt.sign({ payload, ita: 600000 }, "myKey");

        return res.status(200).json({
          token,
        });
      });
    })
    .catch(() => {
      return res.status(500).json({ errors: [{ msg: "Invalid credentials" }] });
    });
};
