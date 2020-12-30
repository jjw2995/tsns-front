import React from "react";
import { Switch, Route } from "react-router-dom";
import About from "./pages/About";
import Explore from "./pages/Explore";
import Home from "./pages/Home";
import Mine from "./pages/Mine";
import NavigationBar from "./NavigationBar";
import User from "./userInfo/User";

function AuthRequired(props) {
  return (
    <React.Fragment>
      <NavigationBar {...props} />
      <Switch>
        <Route exact path="/home" component={Home} />
        <Route exact path="/explore" component={Explore} />
        <Route exact path="/explore/users/:uid" component={User} />
        <Route exact path="/mine" component={Mine} />
        <Route exact path="/about" component={About} />
        <Route path="/" component={Home} />
      </Switch>
    </React.Fragment>
  );
}
export default AuthRequired;
