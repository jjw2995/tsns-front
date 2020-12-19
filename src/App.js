import "./css/App.css";
import React, { useEffect } from "react";

import { BrowserRouter as Router, Route, withRouter } from "react-router-dom";

import { Provider, useSelector } from "react-redux";
import store from "./redux/store";
import { hydrateAuth } from "./redux/auth/AuthActions";
import AuthRequired from "./components/RouteAuthRequired";
import LogoutRequired from "./components/RouteLogoutRequired";

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
  store.dispatch(hydrateAuth());
  const refreshToken = useSelector((state) => state.auth.refreshToken);
  useEffect(() => {
    console.log("rerendering Main");
  });

  return (
    // <Container className="fluid" style={{ marginBottom: "100px" }}>
    <React.Fragment>
      {refreshToken ? (
        <Route component={AuthRequired} />
      ) : (
        <Route component={LogoutRequired} />
      )}
    </React.Fragment>
  );
});

export default App;
