import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getProfile } from "../../actions/profile";
import Spinner from "../layout/Spinner";
import ProfileInfo from "./ProfileInfo";

const IndividualProfile = ({ match, profile, auth, getProfile, history }) => {
  useEffect(() => {
    getProfile(match.params.id);
  }, [match.params.id]);

  return (
    <>
      {profile.loading || profile.profile == null ? (
        <>
          {profile.profile == null ? (
            <>
              <Link
                onClick={() => {
                  history.goBack();
                }}
                className="btn btn-light"
              >
                Go back
              </Link>
            </>
          ) : (
            <Spinner />
          )}
        </>
      ) : (
        <>
          <Link
            onClick={() => {
              history.goBack();
            }}
            className="btn btn-light"
          >
            Go back
          </Link>
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === profile.profile.user._id && (
              <Link to="/edit-profile" className="btn btn-dark">
                Edit profile
              </Link>
            )}
          <ProfileInfo profile={profile.profile} />
        </>
      )}
    </>
  );
};

export default connect((state) => state, { getProfile })(IndividualProfile);
