import React, { useState } from "react";
import { Button } from "react-bootstrap";
import About from "./About";
import LoginForm from "../forms/loginForm/LoginForm";
import RegisterForm from "../forms/RegisterForm";
function LandingPage(props) {
  const [activeTab, setActiveTab] = useState(1);
  const tab = { LOGIN: 1, REGI: 2, ABOUT: 3 };

  const setOnOff = (val) => {
    setActiveTab((pre) => {
      return val === pre ? 0 : val;
    });
  };
  const isActive = (val) => {
    return activeTab === val;
  };
  const toLogin = () => {
    setActiveTab(tab.LOGIN);
  };

  return (
    <div
      style={{
        fontSize: "1.4rem",
        textAlign: "center",
        paddingBottom: "6rem",
      }}
      className="d-flex flex-column justify-content-center"
    >
      <div className="mb-5 mt-5">
        <h1>tSNS, a tiny SNS platform</h1>
        <small style={{ fontSize: ".9rem" }} className="text-muted">
          for my resume'
        </small>
      </div>
      <div className="mb-4">
        <div className="mb-2">
          <Button
            className="mx-3"
            variant="outline-dark"
            // active={activeTab === 1 ? true : false}
            active={isActive(tab.LOGIN) ? true : false}
            onClick={() => setOnOff(tab.LOGIN)}
          >
            Have Account? Login
          </Button>
          <Button
            className="mx-3"
            variant="outline-dark"
            active={isActive(tab.REGI) ? true : false}
            onClick={() => setOnOff(tab.REGI)}
          >
            Create New Account
          </Button>
        </div>
        <Button
          className="mx-3"
          size="lg"
          variant="outline-dark"
          active={isActive(tab.ABOUT) ? true : false}
          onClick={() => setOnOff(tab.ABOUT)}
        >
          About Me and tSNS
        </Button>
      </div>
      {isActive(tab.LOGIN) && <LoginForm props={props} />}
      {isActive(tab.REGI) && <RegisterForm props={props} toLogin={toLogin} />}
      {isActive(tab.ABOUT) && <About />}
    </div>
  );
}

export default LandingPage;
