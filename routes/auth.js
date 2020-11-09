const express = require("express");
const route = express.Router();
const { check } = require("express-validator");
const { sigin } = require("../controllers/auth");

route.post(
  "/auth",
  [
    check("email", "Invalid email").isEmail(),
    check("password", "Invalid password").exists(),
  ],
  sigin
);

module.exports = route;
