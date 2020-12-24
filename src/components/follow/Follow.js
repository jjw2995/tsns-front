import Modal from "react-modal";
import React, { useEffect, useState } from "react";
import BaseUrlAxios from "../../rest/AuthedAxios";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import FolloweesList from "./FolloweesList";
import FollowersList from "./FollowersList";

function FollowersFollowees({ id, isShow }) {
  const [followCounts, setFollowCounts] = useState({
    followeesCount: 0,
    followersCount: 0,
  });

  useEffect(() => {
    BaseUrlAxios()
      .get("/follows/count")
      .then((r) => {
        console.log("HERE");
        console.log(r.data);
        setFollowCounts((pre) => {
          return { ...pre, ...r.data };
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  return (
    <div className="container">
      <div>{id}</div>

      {/* <h4>followings followers list</h4> */}
      <div></div>
      {/* {!isShow ? (
        <div>
          <div>{followCounts.followersCount} - Followers</div>
          <div>{followCounts.followeesCount} - Followees</div>
        </div>
      ) : ( */}
      <div className="row">
        <div className="col">
          <FollowersList
            title={`${followCounts.followersCount} - Followers`}
            isShow={isShow}
          />
        </div>
        <div className="col">
          {/* <ModalShowFollowUsers
            path="/followees"
          /> */}
          <FolloweesList
            title={`${followCounts.followeesCount} - Followees`}
            isShow={isShow}
          />
        </div>
      </div>
    </div>
  );
}

export default FollowersFollowees;

// function ModalShowFollowUsers({ path, title, isShow }) {
//   const [modalIsOpen, setModalIsOpen] = useState(false);
//   const [follows, setFollows] = useState();
//   console.log(path);

//   const openModal = () => setModalIsOpen(true);
//   const closeModal = () => setModalIsOpen(false);

//   const getFollows = () => {
//     console.log("ASDASDASDASDDSADA");
//     BaseUrlAxios()
//       .get(`${path}`)
//       .then((r) => {
//         console.log(r.data);
//         setFollows(r.data);
//       })
//       .catch((e) => {
//         console.log(e);
//       });
//   };

//   const getMoreFollows = () => {
//     console.log("ASDASDASDASDDSADA");
//     if (follows && follows.length > 0) {
//       console.log(follows[follows.length - 1]._id);
//       BaseUrlAxios()
//         .get(`${path}?last-doc-id=${follows[follows.length - 1]._id}`)
//         .then((r) => {
//           console.log(r.data);
//           setFollows((pre) => {
//             console.log([...pre, ...r.data]);
//             return [...pre, ...r.data];
//           });
//         })
//         .catch((e) => {
//           console.log(e);
//         });
//     }
//   };

//   return (
//     <div>
//       <Button
//         disabled={!isShow}
//         className="m-2"
//         onClick={() => {
//           if (isShow) {
//             openModal();
//           }
//         }}
//       >
//         <h4>{title}</h4>
//       </Button>
//       <Modal
//         style={{
//           overlay: {
//             // zIndex: "1000",
//           },
//           content: {
//             top: "13%",
//             bottom: "13%",
//             left: "25%",
//             right: "25%",
//             fontFamily: "sans-serif",
//           },
//         }}
//         isOpen={modalIsOpen}
//         onAfterOpen={getFollows}
//         onRequestClose={closeModal}
//       >
//         <h3>{title}</h3>
//         {follows &&
//           follows.length > 0 &&
//           follows.map((r) => {
//             return (
//               <Link
//                 key={r._id}
//                 className="list-group-item list-group-item-action m-2"
//                 to={`/explore/users/${r.user._id}`}
//               >
//                 <h4>{r.user.nickname}</h4>
//               </Link>
//             );
//           })}
//         <div className="justify-content-center d-flex">
//           <button className="btn btn-secondary " onClick={getMoreFollows}>
//             get more
//           </button>
//         </div>
//         <Button
//           variant="dark"
//           style={{
//             position: "absolute",
//             right: "0",
//             top: "0",
//             zIndex: "1",
//           }}
//           type="button"
//           onClick={closeModal}
//         >
//           x
//         </Button>
//       </Modal>
//     </div>
//   );
// }
