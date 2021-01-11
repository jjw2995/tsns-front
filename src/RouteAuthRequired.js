import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import About from "./components/pages/About";
import Explore from "./components/pages/Explore";
import Home from "./components/pages/Home";
import Mine from "./components/pages/Mine";
import NavigationBar from "./components/NavigationBar";
import User from "./components/pages/User";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";

function AuthRequired(props) {
  const loggedIn = useSelector((s) => s.auth.loggedIn);
  return (
    <React.Fragment>
      {loggedIn ? (
        <React.Fragment>
          <NavigationBar {...props} />
          <Switch>
            <Route exact path="/home" component={Home} />
            <Route exact path="/explore" component={Explore} />
            <Route exact path="/explore/users/:uid" component={User} />
            <Route exact path="/mine" component={Mine} />
            <Route exact path="/about" component={About} />
            {/* <Route path="/" component={Home} /> */}
            {/* <Redirect
          to={{ pathname: "/home", state: { from: props.location } }}
        /> */}
          </Switch>
        </React.Fragment>
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )}
    </React.Fragment>
  );
}
export default AuthRequired;
