import "./css/App.css";
import React, { useEffect, useState } from "react";

import { BrowserRouter as Router, Route, withRouter } from "react-router-dom";

import { Provider, useSelector } from "react-redux";
import store from "./redux/store";
import { hydrateAuth } from "./redux/auth/AuthActions";
import AuthRequired from "./RouteAuthRequired";
import LogoutRequired from "./RouteLogoutRequired";

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
  // const refreshToken = useSelector((state) => state.auth);
  const auth = useSelector((state) => state.auth.refreshToken);
  // const [loggedIn, setLoggedIn] = useState(false);
  // mayby fetch from store directly instead of redux store???
  //
  useEffect(() => {
    store.dispatch(hydrateAuth());
    console.log(auth);
    console.log("???");
  }, []);

  return (
    <React.Fragment>
      {auth ? (
        // hasFetched && <Route component={AuthRequired} />
        <Route component={AuthRequired} />
      ) : (
        // <Route component={LogoutRequired} />
        <Route component={LogoutRequired} />
      )}
    </React.Fragment>
  );
});

export default App;
