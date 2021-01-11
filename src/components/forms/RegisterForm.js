import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Formik, Form } from "formik";
import { Checkbox, FormControlLabel } from "@material-ui/core";
import { MyTextField, MyPasswordField } from "../myComponents/myFields";

import Swal from "sweetalert2";
import {
  nickname,
  email,
  password,
  confirmPassword,
  yupObj,
} from "./utils/yupValidation";
import { BaseUrlAxios } from "../../rest/axiosTypes";

const validationSchema = yupObj({
  nickname,
  password,
  confirmPassword,
  email,
});

function RegisterForm({ toLogin }) {
  const [showPass, setShowPass] = useState(false);

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
      onSubmit={async (data, { setSubmitting, resetForm, setFieldError }) => {
        try {
          setSubmitting(true);
          let a = await BaseUrlAxios().post("/auth/register", data);
          Swal.fire({
            icon: "success",
            title: "Verification Email Sent",
            text: "click the link and login",
          }).then(() => {
            resetForm();
            toLogin();
          });
        } catch (e) {
          let part = e.response.data.part;
          if (part === "email") {
            setFieldError("email", `${part} already taken`);
          }
          if (part === "nickname") {
            setFieldError("nickname", `${part} already taken`);
          }
        } finally {
          setSubmitting(false);
        }
      }}
      validationSchema={validationSchema}
    >
      {() => (
        <Form>
          <div className="text-danger">
            <h2>DO NOT USE PASSWORD USED ON OTHER SITES</h2>
            <p style={{ fontSize: "1rem" }}>
              passwords are handled on my backend and while they are hashed and
              salted, assume it is not secure
            </p>
          </div>
          <p className="text-muted">
            verification email will be sent, click the link within an hour to
            verify account.
          </p>
          <MyTextField
            name="nickname"
            placeholder="Nickname"
            type="input"
            as={Form.Control}
          />
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
          <MyPasswordField
            name="confirmPassword"
            placeholder="Confirm Password"
            type={showPassFn}
            showPass={showPass}
            as={Form.Control}
          />
          <div>
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
