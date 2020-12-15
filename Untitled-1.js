// // import logo from "./logo.svg";
// import "./App.css";
// import axios from "axios";
// // import fs from "fs";
// // const fs = require("fs");
// // let imageFile = fs.readFileSync("./test1.png");
// import imageFile from "./test1.png";
// console.log(imageFile);

// // const authHeader = req.headers['authorization'];
// // 	const token = authHeader && authHeader.split(' ')[1];
// // 	// Bearer <access token>
// // log(imageFile);
// const base = "https://tsns-api.herokuapp.com/";

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
//     form.append("f", { uri: "./test1.png", type: "image/png" });
//     form.append("description", "PublicPost");
//     form.append("level", "public");
//     console.log(r);

//     let accTok = r.data.accessToken;
//     let refTok = r.data.refreshToken;
//     // console.log(r.data);

//     // axios({
//     //   method: 'post',
//     //   url: 'myurl',
//     //   data: bodyFormData,
//     //   headers: {'Content-Type': 'multipart/form-data' }
//     //   })
//     // axios
//     //   .post(base + "posts", form, {
//     //     headers: { authorization: "Bearer " + accTok },
//     //   })
//     axios({
//       method: "post",
//       url: base + "posts",
//       headers: {
//         authorization: "Bearer " + accTok,
//         "content-type": "multipart/form-data",
//       },
//     })
//       .then((r) => {
//         console.log(r);
//       })
//       .catch((e) => {
//         console.log(e.message);
//       });
//   })
//   .catch((e) => {
//     console.log(e);
//   });

// const App = () => {
//   return (
//     <div className="App">
//       <h1>hello</h1>
//     </div>
//   );
// };

// export default App;

import React, { useState } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import { Formik, Form } from "formik";
import { Checkbox, FormControlLabel } from "@material-ui/core";
import * as yup from "yup";
import { MyTextField, MyPasswordField } from "../myFields";

import { setRefToken } from "../../redux";
import { connect } from "react-redux";

function LoginForm() {
  const [showPass, setShowPass] = useState(false);

  const showPassFn = () => {
    return showPass ? "text" : "password";
  };

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={async (data, { setSubmitting }) => {
        setSubmitting(true);
        // async call
        // console.log(data);
        // alert("asd");
        // async call
        try {
          console.log("submit: ", data);
          let a = await await axios.post(
            process.env.REACT_APP_API_ENDPOINT + "/auth/login",
            data
          );
          console.log(a);

          setSubmitting(false);

          // props.toLoginPage();
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
  );
}

const mapStateToProps = (state) => {
  return {
    refreshToken: state.refreshToken,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setRefToken: () => dispatch(setRefToken()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);

// // import fs from "fs";
// // const fs = require("fs");
// // let imageFile = fs.readFileSync("./test1.png");
// import imageFile from "./test1.png";
// console.log(imageFile);

// // const authHeader = req.headers['authorization'];
// // 	const token = authHeader && authHeader.split(' ')[1];
// // 	// Bearer <access token>
// // log(imageFile);
// const base = "https://tsns-api.herokuapp.com/";

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

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

// // ACTION
// export const increment = () => {
//   return {
//     type: "INCREMENT",
//   };
// };

// export const decrement = () => {
//   return {
//     type: "DECREMENT",
//   };
// };

// // REDUCER
// const counterReducer = (state = 0, action) => {
//   switch (action.type) {
//     case "INCREMENT":
//       return state + 1;
//     case "DECREMENT":
//       return state - 1;
//     default:
//       console.log(state);
//       return state;
//   }
// };

// // STORE
// let store = createStore(counterReducer);

// store.subscribe(() => {
//   console.log(store.getState());
// });
// // DISPATCH
// store.dispatch(increment());
