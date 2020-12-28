import React from "react";
import { Button } from "react-bootstrap";

// TODO: error is from showing password, type set to bool
function LandingPage(props) {
  return (
    <div>
      <div className="mb-5">
        <h1>TSNS, tiny SNS platform for the heck of it</h1>
        <small>
          <small className="text-muted">
            who am I kidding it's for my resume'
          </small>
        </small>
      </div>
      <div>
        <Button
          className="mx-3"
          onClick={() => {
            props.history.push("/login");
          }}
        >
          Have Account? Login
        </Button>
        <Button
          className="mx-3"
          onClick={() => {
            props.history.push("/register");
          }}
        >
          Create New Account
        </Button>
      </div>
    </div>
  );
}

export default LandingPage;
