import React, { useState } from "react";
import { Form, Button, FormGroup } from "react-bootstrap";
import axios from "axios";
import { Formik, useField } from "formik";
import { TextField } from "@material-ui/core";
import * as yup from "yup";

// // import fs from "fs";
// // const fs = require("fs");
// // let imageFile = fs.readFileSync("./test1.png");
// import imageFile from "./test1.png";
// console.log(imageFile);

// // const authHeader = req.headers['authorization'];
// // 	const token = authHeader && authHeader.split(' ')[1];
// // 	// Bearer <access token>
// // log(imageFile);
// const base = "https://tsns-api.herokuapp.com/api/";

// // axios.post(base + "auth/register", {
// //   nickname: "asd",
// //   email: "jjw2995@gmail.com",
// //   password: "Testing12#",
// // });
// axios
//   .post(base + "auth/login", {
//     // nickname: "asd",
//     email: "jjw2995@gmail.com",
//     password: "Testing12#",
//   })
//   // formData.append("file", { uri: "file://path/to/image.png", type: "image/png" });

//   .then((r) => {
//     let form = new FormData();
//     // form.append("image", { uri: imageFile, type: "image/png" }, "image.png");

function LoginForm() {
  // const { register, getValues, handleSubmit, errors } = useForm();

  const [msg, setMsg] = useState("");
  const onSubmit = async (e) => {
    // console.log(getValues());
    e.preventDefault();

    const formData = new FormData(e.target),
      formDataObj = Object.fromEntries(formData.entries());
    console.log(formDataObj);
    axios
      .post(process.env.REACT_APP_API_URL + "/api/auth/register", formDataObj)
      .then((r) => {
        console.log(r);
        return <div>asd</div>;
      })
      .catch((e) => {
        // setMsg(e.message);
        // console.log(e);
        // console.log(e.message);
        return <div>asd</div>;
      });
    // try {
    //   let a = await axios.post(
    //     process.env.REACT_APP_API_URL + "/api/auth/register",
    //     formDataObj
    //   );
    //   console.log(a);
    // } catch (error) {
    //   console.log(error);
    //   console.log(error.message);
    //   console.log(error.status);
    // }
    // .catch((e) => {
    // });
  };

  const [showPass, setShowPass] = useState(false);

  const showPassFn = () => {
    return showPass ? "text" : "password";
  };
  const MyTextField = ({ placeholder, ...props }) => {
    const [field, meta] = useField(props);
    const errorText = meta.error && meta.touched ? meta.error : "";

    return (
      <div>
        <TextField
          placeholder={placeholder}
          {...field}
          // helperText={errorText}
          // type={showPass ? "text" : "password"}
          error={!!errorText}
        />
        <div className="px-5 text-danger">
          <small error>{errorText}</small>
        </div>
      </div>
    );
  };

  const MyPasswordField = ({ placeholder, ...props }) => {
    const [field, meta] = useField(props);
    const errorText = meta.error && meta.touched ? meta.error : "";

    return (
      <div>
        <TextField
          placeholder={placeholder}
          {...field}
          // helperText={errorText}
          type={showPass ? "text" : "password"}
          error={!!errorText}
        />
        <div className="px-5 text-danger">
          <small error>{errorText}</small>
        </div>
      </div>
    );
  };

  return (
    <Formik
      initialValues={{}}
      onSubmit={(data, { setSubmitting }) => {
        setSubmitting(true);
        // async call
        console.log("submit: ", data);
        setSubmitting(false);
      }}
      validationSchema={yup.object({
        email: yup.string().max(30).email(),
        password: yup
          .string()
          .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,32})/,
            "8~32 characters containing at least one number, lowercase, UPPERCASE, and special character"
          ),
      })}
    >
      {({ values, errors }) => (
        <Form>
          <pre>{JSON.stringify(values, null, 2)}</pre>
          <pre>{JSON.stringify(errors, null, 2)}</pre>
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
              // type="input"
              type={showPassFn}
              as={Form.Control}
            />
            <Form.Check
              type="checkbox"
              label="show password"
              onClick={() => setShowPass(!showPass)}
            />
          </div>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
}

export default LoginForm;
