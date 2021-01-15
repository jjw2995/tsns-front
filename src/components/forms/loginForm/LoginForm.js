import React, { useState } from "react";
import { Button } from "react-bootstrap";

import { useParams, withRouter } from "react-router";
import { BaseUrlAxios } from "../../../rest/axiosTypes";
import Swal from "sweetalert2";
import Login from "./Login";
import ResetPassword from "./ResetPassword";

function LoginForm(props) {
  const { uid, v_hash, rp_hash } = useParams();
  const [showLogin, setShowLogin] = useState(rp_hash == null);

  const gotoLogin = () => {
    setShowLogin(true);
  };

  if (uid && v_hash) {
    BaseUrlAxios()
      .get(`/auth/verify-account/${uid}/${v_hash}`)
      .then((r) => {
        Swal.fire({
          icon: "success",
          title: "Account Verified",
          text: "you can now login",
        });
      })
      .catch((e) => {
        Swal.fire({
          icon: "error",
          title: "Failed Verification",
          html: `account already verified<br/><b>or</b><br/>an hour passed`,
        });
      })
      .finally(() => {
        // history.push("");
      });
  }

  return (
    <div>
      <div className="m-3">
        <Button
          variant="outline-secondary"
          type="button"
          onClick={() => {
            setShowLogin((pre) => {
              return !pre;
            });
          }}
        >
          {showLogin ? "Forgot Password ?" : "go back to login"}
        </Button>
      </div>
      {showLogin ? (
        <Login props={props} />
      ) : (
        <ResetPassword gotoLogin={gotoLogin} />
      )}
    </div>
  );
}

export default withRouter(LoginForm);
