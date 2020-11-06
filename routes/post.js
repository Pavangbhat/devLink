const express = require("express");
const { isAuthenticated } = require("../controllers/auth");
const route = express.Router();

// @route  GET

// @access Public

// @test
route.get("/post", isAuthenticated, (req, res) => {
  res.send(req.user);
});

module.exports = route;
