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
  // TODO: Error: cannot update state while rendering other comp, fix
  const refreshToken = useSelector((state) => state.auth.refreshToken);
  useEffect(() => {
    store.dispatch(hydrateAuth());
  });

  return (
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
