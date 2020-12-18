import "./css/App.css";
import React from "react";

import { Container } from "react-bootstrap";
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

  return (
    <Container className="fluid" style={{ marginBottom: "100px" }}>
      {refreshToken ? (
        <Route component={AuthRequired} />
      ) : (
        <Route component={LogoutRequired} />
      )}
    </Container>
  );
});

export default App;
