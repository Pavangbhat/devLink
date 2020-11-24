import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getUserProfile } from "../../../actions/profile";
import Spinner from "../Spinner";
import { Link } from "react-router-dom";
import { deleteAccount, loadUser } from "../../../actions/auth";
import DashboardLinks from "./DashboardLinks";
import Experience from "../Experience";
import Education from "../Education";

const Dashboard = ({
  auth,
  profile,
  alert,
  getUserProfile,
  loadUser,
  deleteAccount,
}) => {
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
          <Experience />
          <Education />
          <div class="my-2">
            <button
              class="btn btn-danger"
              onClick={() => {
                deleteAccount();
              }}
            >
              <i class="fas fa-user-minus"> </i>
              Delete My Account
            </button>
          </div>
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

export default connect(mapStateToProp, {
  getUserProfile,
  loadUser,
  deleteAccount,
})(Dashboard);
