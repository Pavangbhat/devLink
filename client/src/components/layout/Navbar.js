import { connect } from "react-redux";
import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../../actions/auth";

const Navbar = ({ auth, logout }) => {
  const authenticatedUser = (
    <ul>
      <li>
        <Link to="/dashboard">
          <i className="fas fa-user" />
          <span className="hide-sm"> Dashboard</span>
        </Link>
      </li>
      <li>
        <Link
          to="/login"
          onClick={() => {
            logout();
          }}
        >
          <i className="fas fa-sign-out-alt" />
          <span className="hide-sm"> Logout</span>
        </Link>
      </li>
    </ul>
  );
  const guestUser = (
    <ul>
      <li>
        <Link to="/">Developers</Link>
      </li>
      <li>
        <Link to="/signup">Signup</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fas fa-code"></i> DevConnector
        </Link>
      </h1>
      {!auth.loading && (
        <>{auth.isAuthenticated ? authenticatedUser : guestUser}</>
      )}
    </nav>
  );
};
const mapStateToProps = (state) => {
  return state;
};
export default connect(mapStateToProps, {
  logout,
})(Navbar);
