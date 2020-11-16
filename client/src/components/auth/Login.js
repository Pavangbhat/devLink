import React, { useState } from "react";
import { Link } from "react-router-dom";

export const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const changeText = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmitForm = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <h1 class="large text-primary">Login In</h1>
      <p class="lead">
        <i class="fas fa-user"></i> Log into Your Account
      </p>
      <form
        class="form"
        onSubmit={(e) => {
          onSubmitForm(e);
        }}
      >
        <div class="form-group">
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
        <div class="form-group">
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
        <input type="submit" class="btn btn-primary" value="Login" />
      </form>
      <p class="my-1">
        Don't have an account? <Link to="/signup">Sign up</Link>
      </p>
    </>
  );
};
