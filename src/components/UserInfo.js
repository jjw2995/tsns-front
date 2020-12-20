import React, { useState, useEffect } from "react";
import BaseUrlAxios from "../AuthedAxios";

const logErr = (e) => {
  console.log(JSON.parse(JSON.stringify(e)));
};

const Selfinfo = (user) => {
  const [myInfo, setMyInfo] = useState();

  useEffect(() => {
    console.log("???");
    BaseUrlAxios()
      .get(`/users/${user._id}`)
      .then((r) => {
        console.log("get user/:uid : ", r.data);
        setMyInfo(r.data);
      })
      .catch((e) => {
        console.log(JSON.parse(JSON.stringify(e)));
      });
  }, []);

  // { isPrivate: body.isPrivate },

  return (
    <div>
      <h1>My info</h1>
      {myInfo ? (
        <div>
          <div>{myInfo.nickname}</div>
          <div>{myInfo.isPrivate ? <div>private</div> : <div>public</div>}</div>
          <button
            type="button"
            onClick={() => {
              BaseUrlAxios()
                .post("users/private", {
                  isPrivate: !myInfo.isPrivate,
                })
                .then((r) => {
                  console.log("from api, setting isPrivate", r.data);
                  let newMyInfo = { ...user };
                  newMyInfo.isPrivate = r.data.isPrivate;
                  setMyInfo(newMyInfo);
                })
                .catch((e) => {
                  console.log(JSON.parse(JSON.stringify(e)));
                });
            }}
          >
            {myInfo.isPrivate ? <div>go Private</div> : <div>go Public</div>}
          </button>
        </div>
      ) : (
        <div />
      )}
    </div>
  );
};

const OtherInfo = () => {
  //   const [results, setResults] = useState([]);
  //   const [expUserID, setExpUserID] = useState();
  //   useEffect(() => {}, [expUserID]);

  //   const onReqeust = (newState) => {
  //     setUser(() => {
  //       newState.isFollowing = !newState.isFollowing;
  //       console.log("newState b4 setting: ", newState);
  //       return newState;
  //     });
  //   };
  return <div></div>;
  //   return (
  //     <div>
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
  //                 !user.isFollowing
  //                   ? BaseUrlAxios()
  //                       .post("/followees", { _id: uid })
  //                       .then((r) => {
  //                         console.log("follow request: ", r.data);
  //                         newState.isPending = r.data.isPending;
  //                         onReqeust(newState);
  //                       })
  //                       .catch((e) => {
  //                         logErr(e);
  //                       })
  //                   : BaseUrlAxios()
  //                       .delete(`/followees/${uid}`)
  //                       .then((r) => {
  //                         console.log("unfollow request: ", r.data);
  //                         newState.isPending = r.data.isPending;
  //                         onReqeust(newState);
  //                       })
  //                       .catch((e) => {
  //                         logErr(e);
  //                       });
  //               }}
  //             >
  //               {user.isFollowing ? <div>unfollow</div> : <div>follow</div>}
  //             </button>
  //           </div>
  //         </div>
  //       ) : (
  //         <div />
  //       )}
  //     </div>
  //   );
};

function UserInfo({ uid }) {
  // get posts by user id
  // user info
  const self = JSON.parse(localStorage.getItem("AUTH")).user;

  console.log(self._id === uid);

  const [user, setUser] = useState();

  useEffect(() => {
    BaseUrlAxios()
      .get(`/users/${uid}`)
      .then((r) => {
        console.log("get user/:uid : ", r.data);
        setUser(r.data);
      })
      .catch((e) => {
        console.log(JSON.parse(JSON.stringify(e)));
      });
  }, []);

  return (
    <React.Fragment>
      {self._id === uid ? <Selfinfo user={self} /> : <OtherInfo />}
    </React.Fragment>
  );
}

export default UserInfo;

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
