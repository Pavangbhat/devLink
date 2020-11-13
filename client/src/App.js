import React from "react";
import "./App.css";
import { Landing } from "./components/layout/Landing";
import { Navbar } from "./components/layout/Navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Login } from "./components/auth/Login";
import { Signup } from "./components/auth/Signup";
import { Provider } from "react-redux";
import store from "./store";

export const App = () => {
  return (
    <>
      <Provider store={store}>
        <Router>
          <Navbar />
          <Route component={Landing} exact path="/" />
          <Switch>
            <section className="container">
              <Route component={Login} exact path="/login" />
              <Route component={Signup} exact path="/signup" />
            </section>
          </Switch>
        </Router>
      </Provider>
    </>
  );
};
