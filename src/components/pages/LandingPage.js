import React, { useState } from "react";
import { Button } from "react-bootstrap";
import About from "./About";
import LoginForm from "../forms/LoginForm";
import RegisterForm from "../forms/RegisterForm";
// TODO: error is from showing password, type set to bool
function LandingPage(props) {
  const [activeTab, setActiveTab] = useState(1);

  const setOnOff = (val) => {
    setActiveTab((pre) => {
      return val === pre ? 0 : val;
    });
  };
  const isLoginActive = () => {
    return activeTab === 1;
  };
  const isRegisterActive = () => {
    return activeTab === 2;
  };
  const isAboutActive = () => {
    return activeTab === 3;
  };
  const setLoginActive = () => {
    setOnOff(1);
  };
  const setRegisterActive = () => {
    setOnOff(2);
  };
  const setAboutActive = () => {
    setOnOff(3);
  };
  return (
    <div
      // className="d-flex flex-column justify-content-center"
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
            active={isLoginActive() ? true : false}
            onClick={setLoginActive}
          >
            Have Account? Login
          </Button>
          <Button
            className="mx-3"
            variant="outline-dark"
            active={isRegisterActive() ? true : false}
            onClick={setRegisterActive}
          >
            Create New Account
          </Button>
        </div>
        <Button
          className="mx-3"
          size="lg"
          variant="outline-dark"
          active={isAboutActive() ? true : false}
          onClick={setAboutActive}
        >
          About Me and tSNS
        </Button>
      </div>
      {isLoginActive() && <LoginForm />}
      {isRegisterActive() && <RegisterForm />}
      {isAboutActive() && <About />}
    </div>
  );
}

export default LandingPage;
