import React, { useEffect } from "react";
import "./App.css";
import Landing from "./components/layout/Landing";
import Navbar from "./components/layout/Navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import { Provider } from "react-redux";
import store from "./store";
import Alert from "./components/layout/Alert";
import setHeader from "./utlis/setHeader";
import { USER_LOADED, AUTH_ERROR } from "./actions/types";
import Dashboard from "./components/layout/dashboard/Dashboard";
import PrivateRoute from "./components/routing/PrivateRoute";
import CreateProfile from "./components/layout/profile-form/CreateProfile";
import EditProfile from "./components/layout/profile-form/EditProfile";
import AddExperience from "./components/layout/profile-form/AddExperience";
import AddEducation from "./components/layout/profile-form/AddEducation";
import Profiles from "./components/profile/Profiles";
import IndividualProfile from "./components/profile/IndividualProfile";
const axios = require("axios").default;

export const App = () => {
  if (localStorage.token) {
    setHeader(localStorage.token);
  }

  useEffect(() => {
    if (localStorage.token) {
      setHeader(localStorage.token);
    }
    if (localStorage.token) {
      axios
        .get("http://localhost:5000/api/getuser")
        .then((user) => {
          store.dispatch({
            type: USER_LOADED,
            payload: user.data,
          });
        })
        .catch((err) => {
          store.dispatch({
            type: AUTH_ERROR,
          });
        });
    } else {
      store.dispatch({
        type: AUTH_ERROR,
      });
    }
  }, []);

  return (
    <>
      <Provider store={store}>
        <Router>
          <Navbar />
          <Route component={Landing} exact path="/" />

          <section className="container">
            <Alert />
            <Switch>
              <Route component={Login} exact path="/login" />
              <Route component={Signup} exact path="/signup" />
              <Route component={Profiles} exact path="/profiles" />
              <Route component={IndividualProfile} exact path="/profile/:id" />
              <PrivateRoute path="/dashboard">
                <Dashboard />
              </PrivateRoute>
              <PrivateRoute path="/create-profile">
                <CreateProfile />
              </PrivateRoute>
              <PrivateRoute path="/edit-profile">
                <EditProfile />
              </PrivateRoute>
              <PrivateRoute path="/add-experience">
                <AddExperience />
              </PrivateRoute>
              <PrivateRoute path="/add-education">
                <AddEducation />
              </PrivateRoute>
            </Switch>
          </section>
        </Router>
      </Provider>
    </>
  );
};
