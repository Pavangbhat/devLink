import { connect } from "react-redux";
import React, { useEffect } from "react";
import { getProfiles } from "../../actions/profile";
import Spinner from "../layout/Spinner";
import Profile from "./Profile";

const Profiles = ({ getProfiles, profile }) => {
  //   console.log(profile);
  useEffect(() => {
    getProfiles();
  }, []);

  return (
    <>
      {profile.loading ? (
        <Spinner />
      ) : (
        <>
          <h1 class="large text-primary">Developers</h1>
          <p class="lead">
            <i class="fab fa-connectdevelop"></i> Browse and connect with
            developers
          </p>
          {profile.profiles.length > 0 ? (
            profile.profiles.map((dev) => <Profile profile={dev} />)
          ) : (
            <h4>No profiles found</h4>
          )}
        </>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, { getProfiles })(Profiles);
