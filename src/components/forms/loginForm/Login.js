import { Formik, Form } from "formik";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { BaseUrlAxios } from "../../../rest/axiosTypes";
import { MyPasswordField, MyTextField } from "../../myComponents/myFields";
import { Checkbox, FormControlLabel } from "@material-ui/core";
import { login } from "../../../redux/auth/AuthActions";
import * as yup from "yup";
import { yupObj, email, password } from "../utils/yupValidation";

function Login(props) {
  const [showPass, setShowPass] = useState(false);
  const [doesExist, setDoesExist] = useState(true);
  const dispatch = useDispatch();

  const showPassFn = () => {
    return showPass ? "text" : "password";
  };

  return (
    <div>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={async (data) => {
          BaseUrlAxios()
            .post(`/auth/login`, data)
            .then((r) => {
              dispatch(login(r.data));
              props.history.push("/home");
            })
            .catch((e) => {
              // setDoesExist(false);
            });
        }}
        validationSchema={yupObj({
          email,
          password,
        })}
      >
        {({ values, errors, handleChange }) => (
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
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Login;
