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
