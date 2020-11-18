import React from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";

function PrivateRoute({ children, auth, ...rest }) {
  // console.log();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        !auth.loading && !auth.isAuthenticated ? (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        ) : (
          children
        )
      }
    />
  );
}

const mapStateToProp = (state) => {
  return state;
};

export default connect(mapStateToProp)(PrivateRoute);
