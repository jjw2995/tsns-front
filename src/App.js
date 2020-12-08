import "./css/App.css";
import NavigationBar from "./components/NavigationBar";
import Explore from "./components/Explore";
import Auth from "./components/Auth";
import About from "./components/About";
import Mine from "./components/Mine";
import Home from "./components/Home";
import React from "react";

import { Container } from "react-bootstrap";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter,
} from "react-router-dom";

function App() {
  return (
    <Container className="App">
      <pre>{process.env.REACT_APP_API_URL}</pre>
      <Router>
        <Main />
      </Router>
    </Container>
  );
}

const Main = withRouter(({ location }) => {
  return (
    <React.Fragment>
      <pre>{location.pathname}</pre>
      {location.pathname !== "/" && <NavigationBar activ={location.pathname} />}
      <Switch>
        <Route exact path="/" component={Auth} />
        <Route path="/home" component={Home} />
        <Route path="/explore" component={Explore} />
        <Route path="/mine" component={Mine} />
        <Route path="/about" component={About} />
      </Switch>
    </React.Fragment>
  );
});

export default App;
