import "./css/App.css";
import React, { useEffect, useState } from "react";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter,
} from "react-router-dom";

import { Provider, useSelector } from "react-redux";
import store from "./redux/store";
import { hydrateAuth } from "./redux/auth/AuthActions";
import AuthRequired from "./RouteAuthRequired";
import LogoutRequired from "./RouteLogoutRequired";
import { ProtectedRoute, PublicOnlyRoute } from "./components/ProtectedRoute";
import Home from "./components/pages/Home";
import Explore from "./components/pages/Explore";
import User from "./components/pages/User";
import Mine from "./components/pages/Mine";
import About from "./components/pages/About";
import LandingPage from "./components/pages/LandingPage";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Main />
      </Router>
    </Provider>
  );
}

const Main = withRouter((props) => {
  const hasFetched = useSelector((state) => state.auth.refreshToken);
  console.log("Selector hasFetched", hasFetched);

  // const isFetched = localStorage.getItem("AUTH");
  // console.log("in Main, AUTH: ", isFetched);

  useEffect(() => {
    store.dispatch(hydrateAuth());
  }, []);

  return (
    <React.Fragment>
      {hasFetched ? (
        <Switch>
          {/* <PublicOnlyRoute exact path="/" component={LandingPage} /> */}
          {/* <Route exact path="/" component={LandingPage} /> */}
          <ProtectedRoute exact path="/home" component={Home} />
          <ProtectedRoute exact path="/explore" component={Explore} />
          <ProtectedRoute exact path="/explore/users/:uid" component={User} />
          <ProtectedRoute exact path="/mine" component={Mine} />
          <ProtectedRoute exact path="/about" component={About} />
          <ProtectedRoute path="" component={Home} />
        </Switch>
      ) : (
        <PublicOnlyRoute exact path="/" component={LandingPage} />
      )}
    </React.Fragment>
  );
});

export default App;
