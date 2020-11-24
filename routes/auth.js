const { Router } = require("express");
const express = require("express");
const route = express.Router();
const { check } = require("express-validator");
const {
  sigin,
  getAUser,
  deleteAccount,
  isAuthenticated,
} = require("../controllers/auth");

route.post(
  "/auth",
  [
    check("email", "Invalid email").isEmail(),
    check("password", "Invalid password").exists(),
  ],
  sigin
);
route.get("/getUser", getAUser);
module.exports = route;

route.delete("/deleteAccount", isAuthenticated, deleteAccount);
