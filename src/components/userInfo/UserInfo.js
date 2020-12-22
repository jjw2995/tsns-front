// import React, { useState, useEffect } from "react";
// import BaseUrlAxios from "../../rest/AuthedAxios";
// import Follow from "../Follow";

// const logErr = (e) => {
//   console.log(JSON.parse(JSON.stringify(e)));
// };

// const Selfinfo = (user) => {
//   const [myInfo, setMyInfo] = useState(user);

//   return (
//     <div>
//       <h1>My info</h1>
//       {myInfo ? (
//         <div>
//           <div>{myInfo.nickname}</div>
//           <div>{myInfo.isPrivate ? <div>private</div> : <div>public</div>}</div>
//           <button
//             type="button"
//             onClick={() => {
//               BaseUrlAxios()
//                 .post("users/private", {
//                   isPrivate: !myInfo.isPrivate,
//                 })
//                 .then((r) => {
//                   console.log("from api, setting isPrivate", r.data);
//                   let newMyInfo = { ...user };
//                   newMyInfo.isPrivate = r.data.isPrivate;
//                   setMyInfo(newMyInfo);
//                 })
//                 .catch((e) => {
//                   console.log(JSON.parse(JSON.stringify(e)));
//                 });
//             }}
//           >
//             {!myInfo.isPrivate ? <div>go Private</div> : <div>go Public</div>}
//           </button>
//         </div>
//       ) : (
//         <div />
//       )}
//       <Follow id={myInfo._id} isShow={true} />
//     </div>
//   );
// };

// const OtherInfo = ({ userInf }) => {
//   // get posts by user id
//   // user info
//   const [user, setUser] = useState(userInf);

//   const onReqeust = (newState) => {
//     setUser(() => {
//       newState.isFollowing = !newState.isFollowing;
//       console.log("newState b4 setting: ", newState);
//       return newState;
//     });
//   };

//   return (
//     <div>
//       <pre>{JSON.stringify(user, null, 2)}</pre>

//       {user ? (
//         <div className="card">
//           <div>{user.nickname}</div>
//           {user.isFollowing ? (
//             user.isPending ? (
//               <div>pending</div>
//             ) : (
//               <div>following</div>
//             )
//           ) : user.private ? (
//             <div>this user is private</div>
//           ) : (
//             <br />
//             // <div></div>
//           )}
//           {/* <div className="card-body">{JSON.stringify(user, null, 2)}</div> */}
//           <div>
//             <button
//               onClick={() => {
//                 // console.log(user);
//                 let newState = { ...user };
//                 if (!user.isFollowing) {
//                   BaseUrlAxios()
//                     .post("/followees", { _id: user._id })
//                     .then((r) => {
//                       console.log("follow request: ", r.data);
//                       newState.isPending = r.data.isPending;
//                       onReqeust(newState);
//                     })
//                     .catch((e) => {
//                       logErr(e);
//                     });
//                 } else {
//                   BaseUrlAxios()
//                     .delete(`/followees/${user._id}`)
//                     .then((r) => {
//                       console.log("wtf");
//                       console.log("unfollow request: ", r.data);
//                       console.log("HEREEEE, ", newState);
//                       newState.isPending = false;
//                       onReqeust(newState);
//                     })
//                     .catch((e) => {
//                       console.log("in error");
//                       logErr(e);
//                     });
//                 }
//               }}
//             >
//               {user.isFollowing ? <div>unfollow</div> : <div>follow</div>}
//             </button>
//           </div>
//         </div>
//       ) : (
//         <div />
//       )}

//       {/* <Posts endPoint={endpoints(user._id).USER} /> */}
//     </div>
//   );
// };

// function UserInfo({ uid }) {
//   // get posts by user id
//   // user info
//   const self = JSON.parse(localStorage.getItem("AUTH")).user;

//   const [user, setUser] = useState();
//   let id = uid;
//   if (!id) {
//     id = self._id;
//   }

//   useEffect(() => {
//     BaseUrlAxios()
//       .get(`/users/${id}`)
//       .then((r) => {
//         console.log("get user/:uid : ", r.data);
//         setUser(r.data);
//       })
//       .catch((e) => {
//         console.log(JSON.parse(JSON.stringify(e)));
//       });
//   }, []);

//   return (
//     <React.Fragment>
//       {user && uid ? <OtherInfo user={user} /> : <Selfinfo user={user} />}
//     </React.Fragment>
//   );
// }

// export default UserInfo;
