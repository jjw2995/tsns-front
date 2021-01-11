import "./css/App.css";
import React, { useEffect } from "react";

import { BrowserRouter as Router, Switch, withRouter } from "react-router-dom";

import { Provider, useSelector } from "react-redux";
import store from "./redux/store";
import { hydrateAuth } from "./redux/auth/AuthActions";
import { ProtectedRoute, PublicOnlyRoute } from "./components/RouteTypes";
import {
  Home,
  Explore,
  User,
  Mine,
  About,
  LandingPage,
} from "./components/pages";
import ScrollToTop from "./components/ScrollToTop";

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
  // const loggedIn = JSON.parse(localStorage.getItem("AUTH"));
  // const loggedIn = useSelector((state) => state.auth.loggedIn);

  useEffect(() => {
    store.dispatch(hydrateAuth());
  }, []);
  return (
    <Router>
      <ScrollToTop />
      <Switch>
        <ProtectedRoute exact path="/home" component={Home} />
        <ProtectedRoute exact path="/explore" component={Explore} />
        <ProtectedRoute exact path="/explore/users/:uid" component={User} />
        <ProtectedRoute exact path="/mine" component={Mine} />
        <ProtectedRoute exact path="/about" component={About} />
        <PublicOnlyRoute path="/login" component={LandingPage} />
        <PublicOnlyRoute
          path="/reset-password/:uid?/:rp_hash?"
          component={LandingPage}
        />
        <PublicOnlyRoute path="/:uid?/:v_hash?" component={LandingPage} />
      </Switch>
    </Router>
  );
  // return (
  //   <Router>
  //     <ScrollToTop />
  //     {loggedIn ? (
  //       <Switch>
  //         <ProtectedRoute exact path="/home" component={Home} />
  //         <ProtectedRoute exact path="/explore" component={Explore} />
  //         <ProtectedRoute exact path="/explore/users/:uid" component={User} />
  //         <ProtectedRoute exact path="/mine" component={Mine} />
  //         <ProtectedRoute exact path="/about" component={About} />
  //         {/* <Redirect to="/home" /> */}
  //       </Switch>
  //     ) : (
  //       <PublicOnlyRoute path="/:uid?/:vhash?" component={LandingPage} />
  //       // <Switch>
  //       //   {/* <PublicOnlyRoute path="/" component={LandingPage} /> */}
  //       // </Switch>
  //     )}
  //   </Router>
  // );
});

export default App;
