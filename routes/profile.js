const express = require("express");
const { check } = require("express-validator");
const { isAuthenticated } = require("../controllers/auth");
const {
  getOwnProfile,
  createOrUpdateProfile,
  getAllProfile,
  getAParticularProfile,
  deleteAProfile,
  experienceInProfile,
  deleteAEducation,
  deleteAExperience,
  educationInProfile,
  getGithubrepos,
} = require("../controllers/profile");

const route = express.Router();
const Profile = require("../models/Profile");

// Get own profile
route.get("/profile/me", isAuthenticated, getOwnProfile);

// Create or Update profile
route.post(
  "/profile",
  [
    isAuthenticated,
    [
      check("status", "status is required").not().isEmpty(),
      check("skills", "skills is required").not().isEmpty(),
    ],
  ],
  createOrUpdateProfile
);

// Get all profiles
route.get("/profiles", getAllProfile);

// Get a particular profile
route.get("/profile/user/:user_id", getAParticularProfile);

// Delete profile
route.delete("/profile/delete", isAuthenticated, deleteAProfile);

// PUT Experience in Profile
route.put(
  "/profile/experience",
  [
    isAuthenticated,
    [
      check("title", "title is required").not().isEmpty(),
      check("company", "company is required").not().isEmpty(),
      check("from", "from is required").not().isEmpty(),
    ],
  ],
  experienceInProfile
);

// DELETE a experience
route.delete(
  "/profile/experience/delete/:experience_id",
  isAuthenticated,
  deleteAExperience
);

// PUT education
route.put(
  "/profile/education",
  [
    isAuthenticated,
    [
      check("school", "school is required").not().isEmpty(),
      check("degree", "company is required").not().isEmpty(),
      check("fieldofstudy", "fieldofstudy is required").not().isEmpty(),
      check("from", "from is required").not().isEmpty(),
    ],
  ],
  educationInProfile
);

// DELETE a educaton
route.delete(
  "/profile/education/delete/:education_id",
  isAuthenticated,
  deleteAEducation
);

// GET github Profile
route.get("/github/profile/:username", getGithubrepos);

module.exports = route;
