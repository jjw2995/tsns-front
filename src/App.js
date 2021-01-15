import "./css/App.css";
import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, withRouter } from "react-router-dom";
import { Provider } from "react-redux";
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
import { BaseUrlAxios } from "./rest/axiosTypes";

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
  useEffect(() => {
    BaseUrlAxios().get("");
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
        <PublicOnlyRoute
          exact
          path="/reset-password/:uid?/:rp_hash?"
          component={LandingPage}
        />
        <PublicOnlyRoute exact path="/:uid?/:v_hash?" component={LandingPage} />
        <PublicOnlyRoute path="" component={LandingPage} />
      </Switch>
    </Router>
  );
});

export default App;
