import "./css/App.css";
import React, { useEffect } from "react";

import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route, withRouter } from "react-router-dom";

import { Provider, useDispatch, useSelector } from "react-redux";
import store from "./redux/store";
import { updateLoginState } from "./redux/auth/AuthActions";
import AuthRequired from "./components/AuthRequired";
import LogoutRequired from "./components/LogoutRequired";

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
  const refreshToken = useSelector((state) => state.auth.refreshToken);
  // console.log(refreshToken);
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateLoginState());
  }, []);

  return (
    <Container fluid>
      {/* <pre className="text-left">{JSON.stringify(refreshToken, null, 2)}</pre> */}
      {/* <pre className="text-left">{`base_url :=  ${process.env.REACT_APP_API_URL}\npath     :=  ${path}`}</pre> */}

      {refreshToken ? (
        <Route component={AuthRequired} />
      ) : (
        <Route component={LogoutRequired} />
      )}
    </Container>
  );
});

export default App;
