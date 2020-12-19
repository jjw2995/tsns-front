import React, { useState } from "react";
import BaseUrlAxios from "../../redux/AuthedAxios";
import { useParams } from "react-router";
import Posts, { endpoints } from "../PostComponent/Posts";

function User(props) {
  // get posts by user id
  // user info
  const [user, setUser] = useState();

  const userExp = "userExp";
  const { uid } = useParams();
  console.log(uid);

  // useState(() => {
  //   BaseUrlAxios().get("/posts/");
  //   // if (user) {
  //   //   sessionStorage.setItem(userExp, user);
  //   // } else {
  //   //   if (sessionStorage.getItem(userExp)) {
  //   //     setUser(sessionStorage.getItem(userExp));
  //   //   } else {
  //   //     // return error
  //   //     // sessionStorage.setItem("userExp", props.location.user);
  //   //   }
  //   // }
  // }, []);
  console.log("User: ", props.location.user);
  return (
    <div>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      {/* {() => {
        if (user) {
          return (
            <div className="card">
              <div className="card-title">asd</div>
              <div className="card-body">{JSON.stringify(user, null, 2)}</div>
            </div>
          );
        }
        return <div />;
      }} */}
      {user ? (
        <div className="card">
          <div className="card-title">asd</div>
          <div className="card-body">{JSON.stringify(user, null, 2)}</div>
        </div>
      ) : (
        <div />
      )}

      <Posts endPoint={endpoints(uid).USER} />
    </div>
  );
}

export default User;

// import React, { useState } from "react";
// import BaseUrlAxios from "../../redux/AuthedAxios";
// import { useParams } from "react-router";
// import Posts, { endpoints } from "../PostComponent/Posts";

// function User(props) {
//   // get posts by user id
//   // user info

//   const { uid } = useParams();
//   useState(() => {

//   }, []);
//   console.log("User: ", props.location.user);
//   return (
//     <div>
//       <pre>{JSON.stringify(user, null, 2)}</pre>

//       {user && (
//         <div className="card">
//           <div className="card-title">asd</div>
//           <div className="card-body">{JSON.stringify(user, null, 2)}</div>
//           {() => {
//             return;
//           }}
//           <Posts endPoint={endpoints(user._id).USER} />
//         </div>
//       )}
//     </div>
//   );
// }

// export default User;
