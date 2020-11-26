import React from "react";
import { Link } from "react-router-dom";
const Profile = ({
  profile: {
    user: { name, avatar, _id },
    skills,

    company,

    location,

    status,
  },
}) => {
  return (
    <div className="profiles">
      <div className="profile bg-light">
        <img className="round-img" src={avatar} alt="" />
        <div>
          <h2>{name && name}</h2>
          <p>
            {company && <span>{status}</span>} at <span>{company}</span>
          </p>
          <p>{location && location}</p>
          <Link to={`/profile/${_id}`} className="btn btn-primary">
            View Profile
          </Link>
        </div>

        <ul>
          {skills.length > 0 ? (
            <>
              {skills.slice(0, 4).map((skill, index) => (
                <li className="text-primary">
                  <i className="fas fa-check" key={index}></i> {skill}
                </li>
              ))}
            </>
          ) : (
            <></>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Profile;
