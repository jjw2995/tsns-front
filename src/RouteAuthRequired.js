import React from "react";
import { Switch, Route } from "react-router-dom";
import About from "./components/pages/About";
import Explore from "./components/pages/Explore";
import Home from "./components/pages/Home";
import Mine from "./components/pages/Mine";
import NavigationBar from "./components/NavigationBar";
import User from "./components/pages/User";
import { Button } from "react-bootstrap";
import { isSmallWindow } from "./utils";

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

      <div
        className="d-flex justify-content-end fixed-bottom"
        style={{ pointerEvents: "none" }}
      >
        <div
          style={{
            left: "100px",
            top: "150px",
            pointerEvents: "initial",
          }}
        >
          <Button
            variant="secondary"
            onClick={() => {
              window.scroll({ top: 0, behavior: "smooth" });
            }}
          >
            ^
          </Button>
        </div>
      </div>
    </React.Fragment>
  );
}
export default AuthRequired;
