import React from "react";
import { Switch, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginForm from "./forms/LoginForm";
import RegisterForm from "./forms/RegisterForm";

function LogoutRequired(props) {
  return (
    <Switch>
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/login" component={LoginForm} />
      <Route exact path="/register" component={RegisterForm} />
      {/* <Route path="/" component={LandingPage} /> */}
    </Switch>
  );
}

export default LogoutRequired;
