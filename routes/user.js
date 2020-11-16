const express = require("express");
const route = express.Router();
const { check } = require("express-validator");
const { createUser } = require("../controllers/user");

route.post(
  "/",
  [
    check("name", "Name cannot be empty").not().isEmpty(),
    check("email", "Invalid email").isEmail(),
    check("password", "Password must be greater then 6 cahracter").isLength({
      min: 6,
    }),
  ],
  createUser
);

// TODO: endpoint to delete user
module.exports = route;
