import React, { useState } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import { Formik, Form } from "formik";
import { Checkbox, FormControlLabel } from "@material-ui/core";
import { MyTextField, MyPasswordField } from "../myFields";
import * as yup from "yup";

const validationSchema = yup.object({
  nickname: yup
    .string()
    .matches(
      /^[a-zA-Z0-9_]{3,16}$/,
      "3~16 alphanumeric (including underscore) characters"
    ),
  password: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,32})/,
      "8~32 characters containing at least one number, lowercase, UPPERCASE, and special character"
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
  email: yup.string().max(30).email(),
});

function RegisterForm(props) {
  const [showPass, setShowPass] = useState(false);
  const [notUnique, setNotUnique] = useState("");

  const showPassFn = () => {
    return showPass ? "text" : "password";
  };

  return (
    <Formik
      initialValues={{
        nickname: "",
        email: "",
        password: "",
        confirmPassword: "",
      }}
      onSubmit={async (data, { setSubmitting }) => {
        setSubmitting(true);

        try {
          console.log("submit: ", data);

          let a = await axios.post(
            process.env.REACT_APP_API_ENDPOINT + "/auth/register",
            data
          );
          console.log(a);
          alert(
            "validation email with a link has been sent, click link and login"
          );
          setSubmitting(false);
          props.history.push("/login");
        } catch (e) {
          setNotUnique(`this ${e.response.data.part} has already been taken`);
        }
      }}
      validationSchema={validationSchema}
    >
      {({ values, errors }) => (
        <Form>
          {/* <pre>{JSON.stringify(values, null, 2)}</pre>
          <pre>{JSON.stringify(errors, null, 2)}</pre> */}
          <p className="text-muted">
            verification email will be sent, click the link within an hour to
            verify account.
          </p>
          <h4 className="text-danger ">{notUnique}</h4>
          <div>
            <MyTextField
              name="nickname"
              placeholder="Nickname"
              type="input"
              as={Form.Control}
            />
          </div>
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
          </div>
          <div>
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
          <Button variant="primary" type="submit">
            REGISTER
          </Button>
        </Form>
      )}
    </Formik>
  );
}

export default RegisterForm;
