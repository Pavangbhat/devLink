const express = require("express");
const { check, validationResult } = require("express-validator");
const { isAuthenticated } = require("../controllers/auth");

const route = express.Router();
const Profile = require("../models/Profile");

// Get own profile
route.get("/profile/me", isAuthenticated, (req, res) => {
  Profile.findOne({ user: req.user.payload.id })
    .populate("user", ["name", "avatar"])
    .then((profile) => {
      if (!profile) {
        return res
          .status(404)
          .json({ errors: { msg: "There is no profile for this user" } });
      }
      res.json(profile);
    })
    .catch((err) => res.status(404).json(err));
});

// Create or Update profile
route.post("/profile", isAuthenticated, (req, res) => {
  // Get fields

  const profileFields = {};
  profileFields.user = req.user.payload.id;
  if (req.body.handle) profileFields.handle = req.body.handle;
  if (req.body.company) profileFields.company = req.body.company;
  if (req.body.website) profileFields.website = req.body.website;
  if (req.body.location) profileFields.location = req.body.location;
  if (req.body.bio) profileFields.bio = req.body.bio;
  if (req.body.status) profileFields.status = req.body.status;
  if (req.body.githubusername)
    profileFields.githubusername = req.body.githubusername;
  // Skills - Spilt into array
  if (typeof req.body.skills !== "undefined") {
    profileFields.skills = req.body.skills.split(",");
  }

  // Social
  profileFields.social = {};
  if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
  if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
  if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
  if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
  if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

  Profile.findOne({ user: req.user.payload.id }).then((profile) => {
    if (profile) {
      // Update
      Profile.findOneAndUpdate(
        { user: req.user.payload.id },
        { $set: profileFields },
        { new: true }
      ).then((profile) => res.json(profile));
    } else {
      // Check if handle exists
      Profile.findOne({ handle: profileFields.handle }).then((profile) => {
        // if (profile) {
        //   let errors = {};
        //   errors.handle = "That handle already exists";
        //   res.status(400).json({ errors });
        // }

        // Save Profile
        new Profile(profileFields).save().then((profile) => res.json(profile));
      });
    }
  });
});

// Get all profiles
route.get("/profiles", isAuthenticated, (req, res) => {
  Profile.find()
    .populate("user", ["name", "avatar"])
    .then((profiles) => {
      return res.json(profiles);
    })
    .catch((err) => {
      return res.status(401).json({ err });
    });
});

// Get a particular profile
route.get("/profile/user/:user_id", isAuthenticated, (req, res) => {
  Profile.findOne({ user: req.params.user_id })
    .populate("user", ["name", "avatar"])
    .then((profile) => {
      return res.json(profile);
    })
    .catch((err) => {
      return res.status(500).json({ err });
    });
});

// Delete profile
route.delete("/profile/delete", isAuthenticated, (req, res) => {
  Profile.findOneAndDelete({ user: req.user.payload.id }).exec((err, pro) => {
    if (!pro) {
      return res.json({ msg: "Users profile dont exsits" });
    }
    if (err) {
      return res.status(500).json({ msg: "Error deleting profile" });
    }
    return res.json({ msg: "Profile removed" });
  });
});

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
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    } = req.body;
    let newExperience = {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    };
    Profile.findOne({ user: req.user.payload.id }).exec((err, profile) => {
      if (err) {
        return res.status(500).json({ msg: err });
      }
      profile.experience.push(newExperience);
      profile.save();

      return res.json(profile);
    });
  }
);

// DELETE a experience
route.delete(
  "/profile/experience/delete/:experience_id",
  isAuthenticated,
  (req, res) => {
    Profile.findOne({ user: req.user.payload.id })
      .then((profile) => {
        let experience = profile.experience.filter((exp, index) => {
          return exp._id != req.params.experience_id;
        });
        profile.experience = experience;
        profile.save();
        res.json(profile);
      })
      .catch((err) => {
        if (err) {
          return res.status(500).json({ msg: err });
        }
      });
  }
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
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    const {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    } = req.body;
    let newEducation = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    };
    Profile.findOne({ user: req.user.payload.id }).exec((err, profile) => {
      if (err) {
        return res.status(500).json({ msg: err });
      }
      profile.education.push(newEducation);
      profile.save();

      return res.json(profile);
    });
  }
);

// DELETE a educaton
route.delete(
  "/profile/education/delete/:education_id",
  isAuthenticated,
  (req, res) => {
    Profile.findOne({ user: req.user.payload.id })
      .then((profile) => {
        let education = profile.education.filter((edu, index) => {
          return edu._id != req.params.education_id;
        });
        profile.education = education;
        profile.save();
        res.json(profile);
      })
      .catch((err) => {
        if (err) {
          return res.status(500).json({ msg: err });
        }
      });
  }
);

module.exports = route;
