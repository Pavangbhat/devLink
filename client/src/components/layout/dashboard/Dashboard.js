import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getUserProfile } from "../../../actions/profile";
import Spinner from "../Spinner";
import { Link } from "react-router-dom";
import { loadUser } from "../../../actions/auth";
import DashboardLinks from "./DashboardLinks";

const Dashboard = ({ auth, profile, alert, getUserProfile, loadUser }) => {
  useEffect(() => {
    loadUser();
    getUserProfile();
  }, []);

  return profile.loading ? (
    <Spinner />
  ) : (
    <div>
      <p className="lead text-muted">Welcome {auth.user && auth.user.name}</p>
      {profile.profile !== null ? (
        <>
          <DashboardLinks />
        </>
      ) : (
        <h1>
          <p>You have not yet setup a profile, please add some info</p>
          <Link to="/create-profile" className="btn btn-lg btn-primary">
            Create Profile
          </Link>
        </h1>
      )}
    </div>
  );
};

const mapStateToProp = (state) => {
  return state;
};

export default connect(mapStateToProp, { getUserProfile, loadUser })(Dashboard);
