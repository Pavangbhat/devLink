import React from "react";
import Moment from "react-moment";
import Spinner from "../layout/Spinner";
import ProfileGithub from "./ProfileGithub";

const ProfileInfo = ({ profile }) => {
  console.log(profile);
  return (
    <>
      <div className="profile-grid my-1">
        <div className="profile-top bg-primary p-2">
          <img
            className="round-img my-1"
            src={profile.user && profile.user.avatar}
            alt=""
          />
          <h1 className="large">{profile.user && profile.user.name}</h1>
          <p className="lead">
            {profile.status} {profile.company && "at"}{" "}
            <span>{profile.company}</span>
          </p>
          <p>{profile.location && profile.location}</p>
          <div className="icons my-1">
            {profile.website && (
              <a
                href={profile.website}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fas fa-globe fa-2x"></i>
              </a>
            )}
            {profile.social && profile.social.twitter && (
              <a
                target="_blank"
                href={profile.social.twitter}
                rel="noopener noreferrer"
              >
                <i className="fab fa-twitter fa-2x"></i>
              </a>
            )}
            {profile.social && profile.social.facebook && (
              <a
                target="_blank"
                href={profile.social.facebook}
                rel="noopener noreferrer"
              >
                <i className="fab fa-facebook fa-2x"></i>
              </a>
            )}
            {profile.social && profile.social.youtube && (
              <a
                target="_blank"
                href={profile.social.youtube}
                rel="noopener noreferrer"
              >
                <i className="fab fa-youtube fa-2x"></i>
              </a>
            )}
            {profile.social && profile.social.instagram && (
              <a
                target="_blank"
                href={profile.social.instagram}
                rel="noopener noreferrer"
              >
                <i className="fab fa-instagram fa-2x"></i>
              </a>
            )}
            {profile.social && profile.social.linkedin && (
              <a
                target="_blank"
                href={profile.social.linkedin}
                rel="noopener noreferrer"
              >
                <i className="fab fa-linkedin fa-2x"></i>
              </a>
            )}
          </div>
        </div>

        <div className="profile-about bg-light p-2">
          <h2 className="text-primary">
            {profile.bio && <span>{profile.user.name}'s bio</span>}
          </h2>
          <p>{profile.bio && profile.bio}</p>
          <div className="line"></div>
          <h2 className="text-primary">Skill Set</h2>
          <div className="skills">
            {profile.skills.map((skill, index) => (
              <div className="p-1" key={index}>
                <i className="fa fa-check"></i> {skill}
              </div>
            ))}
          </div>
        </div>

        <div className="profile-exp bg-white p-2">
          <h2 className="text-primary">Experience</h2>
          {profile.experience.length > 0 ? (
            <>
              {profile.experience.map((exp) => (
                <div key={exp._id}>
                  <h3 className="text-dark">{exp.company}</h3>
                  <Moment format="YYYY/MM/DD">{exp.from}</Moment> -{" "}
                  {exp.to ? (
                    <Moment format="YYYY/MM/DD">{exp.to}</Moment>
                  ) : (
                    "Now"
                  )}
                  <p>
                    <strong>Position: </strong>
                    {exp.title}
                  </p>
                  <p>
                    {exp.description && (
                      <>
                        <strong>Description: </strong>
                        <span>{exp.description}</span>
                      </>
                    )}
                  </p>
                </div>
              ))}
            </>
          ) : (
            <h4>No experience credentials found</h4>
          )}
        </div>

        <div className="profile-edu bg-white p-2">
          <h2 className="text-primary">Education</h2>
          {profile.education.length > 0 ? (
            <>
              {profile.education.map((edu) => (
                <div key={edu._id}>
                  <h3>{edu.school}</h3>
                  <Moment format="YYYY/MM/DD">{edu.from}</Moment> -{" "}
                  {edu.to ? (
                    <Moment format="YYYY/MM/DD">{edu.to}</Moment>
                  ) : (
                    "Now"
                  )}
                  <p>
                    {edu.degree && (
                      <>
                        <strong>Degree: </strong>
                        <span>{edu.degree}</span>
                      </>
                    )}
                  </p>
                  <p>
                    {edu.fieldofstudy && (
                      <>
                        <strong>Field Of Study: </strong>{" "}
                        <span>{edu.fieldofstudy}</span>
                      </>
                    )}
                  </p>
                  <p>
                    {edu.description && (
                      <>
                        <strong>Description: </strong>
                        <span>{edu.description}</span>
                      </>
                    )}
                  </p>
                </div>
              ))}
            </>
          ) : (
            <h4>No experience credentials found</h4>
          )}
        </div>
        {profile.githubusername === "" ? (
          <></>
        ) : (
          <ProfileGithub githubusername={profile.githubusername} />
        )}
      </div>
    </>
  );
};
export default ProfileInfo;
