import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getUserProfile } from "../../../actions/profile";
import { withRouter, Link } from "react-router-dom";
import { createOrUpdateProfile } from "../../../actions/profile";

const EditProfile = ({
  getUserProfile,
  profile,
  createOrUpdateProfile,
  history,
}) => {
  useEffect(() => {
    getUserProfile();
    setFormData({
      company:
        profile.loading || !profile.profile.company
          ? ""
          : profile.profile.company,
      website:
        profile.loading || !profile.profile.website
          ? ""
          : profile.profile.website,
      status:
        profile.loading || !profile.profile.status
          ? ""
          : profile.profile.status,
      location:
        profile.loading || !profile.profile.location
          ? ""
          : profile.profile.location,
      githubusername:
        profile.loading || !profile.profile.githubusername
          ? ""
          : profile.profile.githubusername,
      bio: profile.loading || !profile.profile.bio ? "" : profile.profile.bio,
      skills:
        profile.loading || !profile.profile.skills
          ? ""
          : profile.profile.skills.join(","),
      twitter:
        profile.loading || !profile.profile.social
          ? ""
          : profile.profile.social.twitter,
      facebook:
        profile.loading || !profile.profile.social
          ? ""
          : profile.profile.social.facebook,
      linkedin:
        profile.loading || !profile.profile.social
          ? ""
          : profile.profile.social.linkedin,
      youtube:
        profile.loading || !profile.profile.social
          ? ""
          : profile.profile.social.youtube,
      instagram:
        profile.loading || !profile.profile.social
          ? ""
          : profile.profile.social.instagram,
    });
  }, [profile.loading]);
  const [formData, setFormData] = useState({
    displaySocialInputs: false,
    handle: "",
    company: "",
    website: "",
    location: "",
    status: "",
    skills: "",
    githubusername: "",
    bio: "",
    twitter: "",
    facebook: "",
    linkedin: "",
    youtube: "",
    instagram: "",
    errors: {},
  });

  let {
    displaySocialInputs,
    handle,
    company,
    website,
    location,
    status,
    skills,
    githubusername,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram,
    errors,
  } = formData;

  // console.log(formData.bio);

  const toggleDisplaySocialInputs = () => {
    displaySocialInputs = !displaySocialInputs;
    setFormData({ ...formData, displaySocialInputs });
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmitForm = (e) => {
    e.preventDefault();
    createOrUpdateProfile(formData, history, true);
  };

  return (
    <div>
      <h1 className="large text-primary">Create Your Profile</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Let's get some information to make your
        profile stand out
      </p>
      <small>
        <span style={{ fontSize: "25px", color: "red" }}>*</span> required field
      </small>
      <form className="form" onSubmit={onSubmitForm}>
        <div className="form-group">
          <select
            name="status"
            value={status}
            onChange={(e) => handleChange(e)}
          >
            <option value="">* Select Professional Status</option>
            <option value="Developer">Developer</option>
            <option value="Junior Developer">Junior Developer</option>
            <option value="Senior Developer">Senior Developer</option>
            <option value="Manager">Manager</option>
            <option value="Student or Learning">Student or Learning</option>
            <option value="Instructor">Instructor or Teacher</option>
            <option value="Intern">Intern</option>
            <option value="Other">Other</option>
          </select>
          <small className="form-text">
            Give us an idea of where you are at in your career
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Company"
            name="company"
            value={company}
            onChange={(e) => handleChange(e)}
          />
          <small className="form-text">
            Could be your own company or one you work for
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Website"
            name="website"
            value={website}
            onChange={(e) => handleChange(e)}
          />
          <small className="form-text">
            Could be your own or a company website
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={location}
            onChange={(e) => handleChange(e)}
          />
          <small className="form-text">
            City & state suggested (eg. Boston, MA)
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Skills"
            name="skills"
            value={skills}
            onChange={(e) => handleChange(e)}
          />
          <small className="form-text">
            Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Github Username"
            name="githubusername"
            value={githubusername}
            onChange={(e) => handleChange(e)}
          />
          <small className="form-text">
            If you want your latest repos and a Github link, include your
            username
          </small>
        </div>
        <div className="form-group">
          <textarea
            placeholder="A short bio of yourself"
            name="bio"
            value={bio}
            onChange={(e) => handleChange(e)}
          ></textarea>
          <small className="form-text">Tell us a little about yourself</small>
        </div>

        <div className="my-2">
          <button
            type="button"
            className="btn btn-danger"
            onClick={toggleDisplaySocialInputs}
          >
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>
        {displaySocialInputs ? (
          <div>
            <div className="form-group social-input">
              <i className="fab fa-twitter fa-2x"></i>
              <input
                type="text"
                placeholder="Twitter URL"
                name="twitter"
                value={twitter}
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-facebook fa-2x"></i>
              <input
                type="text"
                placeholder="Facebook URL"
                name="facebook"
                value={facebook}
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-youtube fa-2x"></i>
              <input
                type="text"
                placeholder="YouTube URL"
                name="youtube"
                value={youtube}
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-linkedin fa-2x"></i>
              <input
                type="text"
                placeholder="Linkedin URL"
                name="linkedin"
                value={linkedin}
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-instagram fa-2x"></i>
              <input
                type="text"
                placeholder="Instagram URL"
                name="instagram"
                value={instagram}
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>
        ) : null}
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, {
  getUserProfile,
  createOrUpdateProfile,
})(withRouter(EditProfile));
