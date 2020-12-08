import React, { useState } from "react";
// import { useForm } from "react-hook-form";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { Formik, Field } from "formik";

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

function RegisterForm() {
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

  return (
    <div>
      <Formik
        initialValues={{ nickname: "", email: "" }}
        onSubmit={(data) => {
          console.log("submit: ", data);
        }}
      >
        {({ values, handleChange, handleSubmit }) => (
          <Form onSubmit={handleSubmit} onChange={handleChange}>
            <form></form>
            {/* <Form.Group controlId="formBasicNickname">
              <Form.Control
                type="text"
                placeholder="Nickname"
                value={values.nickname}
                name="nickname"
              />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Control type="email" placeholder="Email" name="email" />
            </Form.Group> */}
            <Button variant="primary" type="submit">
              Submit
            </Button>
            <pre>{JSON.stringify(values, null, 2)}</pre>
          </Form>
        )}
      </Formik>

      <Form onSubmit={onSubmit}>
        <p>{msg}</p>
        <h4>REGISTER</h4>

        <Form.Group controlId="formBasicNickname">
          <Form.Control type="text" placeholder="Nickname" name="nickname" />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Control type="email" placeholder="Email" name="email" />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          {/* <Form.Label>Password</Form.Label> */}
          <Form.Control
            type={showPass ? "text" : "password"}
            placeholder="Password"
            name="password"
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword1">
          <Form.Control
            type={showPass ? "text" : "password"}
            placeholder="Confirm Password"
            name="password1"
          />
        </Form.Group>

        <Form.Group controlId="formBasicCheckbox">
          <Form.Check
            type="checkbox"
            label="show password"
            onClick={() => setShowPass(!showPass)}
          />
        </Form.Group>
        {/* <div> */}
        <Button variant="primary" type="submit">
          Submit
        </Button>

        {/* <input
        type="email"
        placeholder="Email"
        name="email"
        ref={register({
          required: "email required",
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: "email must be a valid email",
          },
        })}
      />
      <input
        type={showPass ? "text" : "password"}
        placeholder="Password"
        name="password"
        ref={register({
          required: "password required",
          pattern: {
            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+])(?=.{8,32})/,
            message:
              "password must contain a number, lowercase, UPPERCASE, special, and be 8~32 characters long",
          },
        })}
      />
      <input
        type={showPass ? "text" : "password"}
        placeholder="Confirm Password"
        name="confirmPass"
        ref={register({
          validate: {
            eqlPassword: (value) =>
              value === getValues().password || "password does not match",
          },
        })}
      /> */}
        {/* <input type="submit" value="register"></input> */}
        {/* {errors.email && <p>{errors.email.message}</p>}
        {errors.password && <p>{errors.password.message}</p>}
        {errors.confirmPass && <p>{errors.confirmPass.message}</p>} */}
        {/* <button onClick={() => setShowPass(!showPass)}>show/hide password</button> */}
      </Form>
    </div>
  );
}

export default RegisterForm;
