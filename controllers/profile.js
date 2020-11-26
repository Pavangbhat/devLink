const { validationResult } = require("express-validator");
const request = require("request");

const Profile = require("../models/Profile");

exports.getOwnProfile = (req, res) => {
  Profile.findOne({ user: req.user.payload.id })
    .populate("user", ["name", "avatar"])
    .then((profile) => {
      if (!profile) {
        return res.json({
          errors: { msg: "There is no profile for this user" },
        });
      }
      res.json(profile);
    })
    .catch((err) => res.status(404).json(err));
};

exports.createOrUpdateProfile = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({
      errors: errors.array(),
    });
  }
  // Get fields
  const profileFields = {};
  profileFields.user = req.user.payload.id;
  if (req.body.handle) profileFields.handle = req.body.handle;

  if (req.body.company) {
    profileFields.company = req.body.company;
  } else {
    profileFields.company = "";
  }
  if (req.body.website) {
    profileFields.website = req.body.website;
  } else {
    profileFields.website = "";
  }
  if (req.body.location) {
    profileFields.location = req.body.location;
  } else {
    profileFields.location = "";
  }
  if (req.body.bio) {
    profileFields.bio = req.body.bio;
  } else {
    profileFields.bio = "";
  }
  if (req.body.status) {
    profileFields.status = req.body.status;
  } else {
    profileFields.status = "";
  }
  if (req.body.githubusername) {
    profileFields.githubusername = req.body.githubusername;
  } else {
    profileFields.githubusername = "";
  }
  // Skills - Spilt into array
  if (typeof req.body.skills !== "undefined") {
    profileFields.skills = req.body.skills.split(",");
  }

  // Social
  profileFields.social = {};
  if (req.body.youtube) {
    profileFields.social.youtube = req.body.youtube;
  } else {
    profileFields.social.youtube;
  }
  if (req.body.twitter) {
    profileFields.social.twitter = req.body.twitter;
  } else {
    profileFields.social.twitter;
  }
  if (req.body.facebook) {
    profileFields.social.facebook = req.body.facebook;
  } else {
    profileFields.social.facebook;
  }
  if (req.body.linkedin) {
    profileFields.social.linkedin = req.body.linkedin;
  } else {
    profileFields.social.linkedin;
  }
  if (req.body.instagram) {
    profileFields.social.instagram = req.body.instagram;
  } else {
    profileFields.social.instagram;
  }

  Profile.findOne({ user: req.user.payload.id }).then((profile) => {
    if (profile) {
      // Update
      Profile.findOneAndUpdate(
        { user: req.user.payload.id },
        { $set: profileFields },
        { new: true }
      ).then((profile) => res.json(profile));
    } else {
      // // Check if handle exists
      // Profile.findOne({ handle: profileFields.handle }).then((profile) => {
      //   // if (profile) {
      //   //   let errors = {};
      //   //   errors.handle = "That handle already exists";
      //   //   res.status(400).json({ errors });
      //   // }

      //   // Save Profile
      //   const newProfile=new Profile(profileFields)
      // });
      const newProfile = new Profile(profileFields);
      newProfile
        .save()
        .then((profile) => res.json({ profile }))
        .catch((err) => res.json(err));
    }
  });
};

exports.getAllProfile = (req, res) => {
  Profile.find()
    .populate("user", ["name", "avatar"])
    .then((profiles) => {
      return res.json(profiles);
    })
    .catch((err) => {
      return res.json({ err });
    });
};

exports.getAParticularProfile = (req, res) => {
  Profile.findOne({ user: req.params.user_id })
    .populate("user", ["name", "avatar"])
    .then((profile) => {
      return res.json(profile);
    })
    .catch((err) => {
      return res.status(500).json({ err });
    });
};

exports.deleteAProfile = (req, res) => {
  Profile.findOneAndDelete({ user: req.user.payload.id }).exec((err, pro) => {
    if (!pro) {
      return res.json({ msg: "Users profile dont exsits" });
    }
    if (err) {
      return res.status(500).json({ msg: "Error deleting profile" });
    }
    return res.json({ msg: "Profile removed" });
  });
};

exports.experienceInProfile = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({
      errors: errors.array(),
    });
  }
  const { title, company, location, from, to, current, description } = req.body;
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
      return res.json({ msg: err });
    }
    profile.experience.push(newExperience);
    profile.save();

    return res.json(profile);
  });
};

exports.deleteAExperience = (req, res) => {
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
};

exports.educationInProfile = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({
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
};

exports.deleteAEducation = (req, res) => {
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
};

exports.getGithubrepos = (req, res) => {
  const options = {
    uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc`,
    method: "GET",
    headers: { "user-agent": "node.js" },
  };
  request(options, (error, response, body) => {
    if (error) console.log(error);
    if (response.statusCode !== 200) {
      res.status(404).json({ msg: "No github profile found" });
    }
    res.json(JSON.parse(body));
  });
};
