const express = require("express");
const route = express.Router();

// @route  GET

// @access Public

// @test
route.get("/profile", (req, res) => {
  res.send("/profile");
});

module.exports = route;
