import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getUserProfile } from "../../../actions/profile";
import Spinner from "../Spinner";
import { Link } from "react-router-dom";
import { loadUser } from "../../../actions/auth";

const Dashboard = ({ auth, profile, alert, getUserProfile, loadUser }) => {
  useEffect(() => {
    loadUser();
    getUserProfile();
  }, []);

  console.log(auth);
  return profile.loading ? (
    <Spinner />
  ) : (
    <div>
      <p className="lead text-muted">
        Welcome {auth.user.name && auth.user.name}
      </p>
      <p>You have not yet setup a profile, please add some info</p>
      <Link to="/create-profile" className="btn btn-lg btn-primary">
        Create Profile
      </Link>
    </div>
  );
};

const mapStateToProp = (state) => {
  return state;
};

export default connect(mapStateToProp, { getUserProfile, loadUser })(Dashboard);
