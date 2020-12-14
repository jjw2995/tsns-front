import React from "react";
import { Switch, Route } from "react-router-dom";
import About from "./pages/About";
import Explore from "./pages/Explore";
import HomePage from "./pages/HomePage";
import Mine from "./pages/Mine";
import NavigationBar from "./NavigationBar";

function AuthRequired(props) {
  return (
    <div>
      <NavigationBar {...props} />
      <Switch>
        <Route exact path="/home" component={HomePage} />
        <Route exact path="/explore" component={Explore} />
        <Route exact path="/mine" component={Mine} />
        <Route exact path="/about" component={About} />
        <Route path="/" component={HomePage} />
      </Switch>
    </div>
  );
}

export default AuthRequired;
