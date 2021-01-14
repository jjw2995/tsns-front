import { Formik, Form } from "formik";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { BaseUrlAxios } from "../../../rest/axiosTypes";
import { MyPasswordField, MyTextField } from "../../myComponents/myFields";
import { Checkbox, FormControlLabel } from "@material-ui/core";
import { login } from "../../../redux/auth/AuthActions";
import { yupObj, email, password } from "../utils/yupValidation";
import Swal from "sweetalert2";
import { useHistory } from "react-router";

function Login() {
  const [showPass, setShowPass] = useState(false);
  const [doesExist, setDoesExist] = useState(true);
  const dispatch = useDispatch();

  const showPassFn = () => {
    return showPass ? "text" : "password";
  };
  const history = useHistory();

  return (
    <div>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={async (data) => {
          BaseUrlAxios()
            .post(`/auth/login`, data)
            .then((r) => {
              dispatch(login(r.data));
              history.push("/home");
            })
            .catch((e) => {
              console.log(e);
              Swal.fire({
                icon: "error",
                title: "Account Not Found",
                text: "try again",
              });
            });
        }}
        validationSchema={yupObj({
          email,
          password,
        })}
      >
        {() => (
          <Form
            onFocus={() => {
              setDoesExist(true);
            }}
          >
            <h3>LOGIN</h3>
            <p className="text-muted" style={{ fontSize: ".8rem" }}>
              if you just registered, check your email for varification
            </p>

            <MyTextField
              name="email"
              placeholder="Email"
              type="input"
              as={Form.Control}
            />

            <MyPasswordField
              name="password"
              placeholder="Password"
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

            <div className="mt-3">
              <Button variant="primary" type="submit">
                Submit
              </Button>
              {!doesExist && (
                <p className="mt-4 text-danger">Account Does Not Exist</p>
              )}
            </div>
            <div className="mt-5">
              If you don't want to register, you can try out with this account{" "}
              <br /> <br />
              <b>email</b> <br />
              personalprojectonly@gmail.com <br />
              <b>password</b> <br />
              Qwer!234
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Login;
