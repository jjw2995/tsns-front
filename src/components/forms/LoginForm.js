import React, { useState } from "react";
import { Button } from "react-bootstrap";
// import axios from "axios";
import { Formik, Form } from "formik";
import { Checkbox, FormControlLabel } from "@material-ui/core";
import * as yup from "yup";
import { MyTextField, MyPasswordField } from "../myFields";

import { useSelector, useDispatch } from "react-redux";

import { login } from "../../redux/auth/AuthActions";

function LoginForm(props) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [showPass, setShowPass] = useState(false);

  const showPassFn = () => {
    return showPass ? "text" : "password";
  };

  return (
    <div>
      {/* <h3>{JSON.stringify(state)}</h3> */}

      <pre>{JSON.stringify(state, null, 2)}</pre>

      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={async (data, { setSubmitting }) => {
          setSubmitting(true);
          try {
            console.log("submit: ", data);

            dispatch(login(data));

            setSubmitting(false);

            // props.toLoginPage();
            props.history.push("/home");
          } catch (e) {
            // TODO: if email or nickname already exists - handle
            console.log(e.response.data);
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
            {/* <pre>{JSON.stringify(values, null, 2)}</pre>
          <pre>{JSON.stringify(errors, null, 2)}</pre> */}
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

// const mapStateToProps = (state) => {
//   return {
//     refreshToken: state.refreshToken,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     setRefToken: () => dispatch(setRefToken()),
//   };
// };

export default LoginForm;