import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import About from "./pages/About";
import Explore from "./pages/Explore";
import Home from "./pages/Home";
import Mine from "./pages/Mine";
import NavigationBar from "./NavigationBar";
import { useDispatch } from "react-redux";
import { keepTokensFresh } from "../redux/auth/AuthActions";

function AuthRequired(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(keepTokensFresh());
  }, []);
  return (
    <div>
      <NavigationBar {...props} />
      {/* <div style={{ paddingBottom: "8rem" }} className="navbar-static-top">
      </div> */}
      {/* <div style={{ marginTop: "6rem" }}> */}
      <Switch>
        <Route exact path="/home" component={Home} />
        <Route exact path="/explore" component={Explore} />
        <Route exact path="/mine" component={Mine} />
        <Route exact path="/about" component={About} />
        <Route path="/" component={Home} />
      </Switch>
      {/* </div> */}
    </div>
  );
}

export default AuthRequired;
