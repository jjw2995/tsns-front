import React from "react";
import { Button } from "react-bootstrap";

// TODO: error is from showing password, type set to bool
function LandingPage(props) {
  // setTimeout(() => {
  //   console.log(props.history.push("/home"));
  // }, 1500);
  // console.log(props);

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

// // ...
// import { useHistory } from "react-router";
// // ...

// function ProfileForm(props) {
//   const history = useHistory();
//   const onSubmit = (data, e) => {
//      e.target.reset();
//      history.push({
//         pathname:  "/OnSubmit",
//         state: {
//           response: messageFromServer
//         }
//      }
//   }
// }

export default LandingPage;
