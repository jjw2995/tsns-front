import { Formik, Form } from "formik";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { BaseUrlAxios } from "../../../rest/axiosTypes";
import { MyPasswordField, MyTextField } from "../../myComponents/myFields";
import { Checkbox, FormControlLabel } from "@material-ui/core";
import Swal from "sweetalert2";
import { useHistory, useParams } from "react-router";
import {
  yupObj,
  email,
  password,
  confirmPassword,
} from "../utils/yupValidation";

const RequestReset = () => {
  return (
    <div>
      <Formik
        initialValues={{ email: "" }}
        onSubmit={async (data) => {
          BaseUrlAxios()
            .post(`/auth/reset-password`, data)
            .then((r) => {
              Swal.fire({
                icon: "success",
                title: "Reset Email Sent",
                text: "click the link and enter new password",
              });
            })
            .catch((e) => {
              Swal.fire({
                icon: "question",
                title: "Could Not Find Account",
                html: `try again<br/><b>or</b><br/>create new account`,
              });
            });
        }}
        validationSchema={yupObj({
          email,
        })}
      >
        {({ values, errors, handleChange }) => (
          <Form>
            <h3>REQUEST PASSWORD RESET</h3>
            <p className="text-muted" style={{ fontSize: ".8rem" }}>
              link to reset password will be sent
            </p>

            <MyTextField
              name="email"
              placeholder="Email"
              type="input"
              as={Form.Control}
            />

            <div className="mt-3">
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

const SetNewPassword = ({ uid, rp_hash, gotoResetReq, gotoLogin }) => {
  const [showPass, setShowPass] = useState(false);

  const history = useHistory();

  const showPassFn = () => {
    return showPass ? "text" : "password";
  };

  return (
    <div>
      <Formik
        initialValues={{
          password: "",
          confirmPassword: "",
        }}
        onSubmit={async ({ password }) => {
          BaseUrlAxios()
            .post(`/auth/set-new-password`, {
              userID: uid,
              resetPassHash: rp_hash,
              password,
            })
            .then((r) => {
              Swal.fire({
                icon: "success",
                title: "Password Reset",
                text: "you can now login with new password",
              });
              history.push("/");
              gotoLogin();
            })
            .catch((e) => {
              Swal.fire({
                icon: "warning",
                title: "Account Not Found",
                html: `account does not exist <br/> <b>or</b> <br/>did not request a password reset`,
              });
              // history.push("/");
              // gotoLogin();

              // gotoResetReq();
            });
        }}
        validationSchema={yupObj({ password, confirmPassword })}
      >
        {({ values, errors, handleChange }) => (
          <Form>
            <div>
              <h3>RESET PASSWORD</h3>
              <p className="text-muted" style={{ fontSize: ".8rem" }}>
                enter new password
              </p>
              <MyPasswordField
                name="password"
                placeholder="Password"
                type={showPassFn}
                showPass={showPass}
                as={Form.Control}
              />
              <MyPasswordField
                name="confirmPassword"
                placeholder="Confirm Password"
                type={showPassFn}
                showPass={showPass}
                as={Form.Control}
              />

              <FormControlLabel
                control={
                  <Checkbox
                    type="checkbox"
                    onClick={() => setShowPass(!showPass)}
                  />
                }
                label="show password"
              />
            </div>

            <div>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </div>
            <div className="mt-3">
              <Button
                variant="outline-secondary"
                onClick={() => {
                  history.push("/");
                  gotoResetReq();
                  // window.location.reload();
                }}
              >
                request password reset
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

function ResetPassword(props) {
  const { uid, rp_hash } = useParams();
  const [showResetReq, setShowResetReq] = useState(rp_hash == null);

  const gotoResetReq = () => {
    setShowResetReq(true);
  };

  return (
    <div>
      {showResetReq ? (
        <RequestReset />
      ) : (
        <SetNewPassword
          uid={uid}
          rp_hash={rp_hash}
          gotoResetReq={gotoResetReq}
          gotoLogin={props.gotoLogin}
        />
      )}
    </div>
  );
}
export default ResetPassword;
