import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { login } from "../../actions/auth";
import { connect } from "react-redux";

const Login = ({ login, auth }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  if (auth.isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  const changeText = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmitForm = (e) => {
    e.preventDefault();
    login(email, password);
  };
  return (
    <>
      <h1 className="large text-primary">Login In</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Log into Your Account
      </p>
      <form
        className="form"
        onSubmit={(e) => {
          onSubmitForm(e);
        }}
      >
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            required
            value={email}
            onChange={(e) => {
              changeText(e);
            }}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => {
              changeText(e);
            }}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/signup">Sign up</Link>
      </p>
    </>
  );
};

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, { login })(Login);
