import React, { useState } from "react";
import { Button } from "react-bootstrap";
// import axios from "axios";
import { Formik, Form } from "formik";
import { Checkbox, FormControlLabel } from "@material-ui/core";
import * as yup from "yup";
import { MyTextField, MyPasswordField } from "../myComponents/myFields";

import { useDispatch } from "react-redux";

import { login } from "../../redux/auth/AuthActions";
import { withRouter } from "react-router";

function LoginForm(props) {
  const [showPass, setShowPass] = useState(false);
  const dispatch = useDispatch();

  console.log("in loginForm", props);
  const showPassFn = () => {
    return showPass ? "text" : "password";
  };

  return (
    <div>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={async (data, { setSubmitting }) => {
          setSubmitting(true);
          try {
            dispatch(login(data));
            setSubmitting(false);
            props.history.push("/home");
          } catch (e) {
            // TODO: if email or nickname already exists - handle
            // console.log(e);
          }
        }}
        validationSchema={yup.object({
          email: yup.string().max(30).email(),
          password: yup
            .string()
            .matches(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,32})/,
              "8~32 characters containing at least one number, lowercase, UPPERCASE, and special character"
            ),
        })}
      >
        {({ values, errors }) => (
          <Form>
            <p className="text-muted">
              if you just registered, check your email for varification
            </p>
            <div>
              <MyTextField
                name="email"
                placeholder="Email"
                type="input"
                as={Form.Control}
              />
            </div>

            <div>
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
            </div>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
export default withRouter(LoginForm);
