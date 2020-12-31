import React from "react";
import { Switch, Route } from "react-router-dom";
import LandingPage from "./components/pages/LandingPage";
import LoginForm from "./components/forms/LoginForm";
import RegisterForm from "./components/forms/RegisterForm";

function LogoutRequired(props) {
  return (
    <Switch>
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/login" component={LoginForm} />
      <Route exact path="/register" component={RegisterForm} />
      <Route path="/" component={LandingPage} />
    </Switch>
  );
}

export default LogoutRequired;
