import { Dropdown, Button } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import BaseUrlAxios from "../../rest/AuthedAxios";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import {
  getPendingFollowers,
  getPendingFollowees,
  acceptPendingFollower,
  dismissFollowerPending,
  deleteFollowee,
  deleteFollower,
} from "./followerApi";
// import { Button } from "bootstrap";

function Pending() {
  // const [follows, setFollows] = useState();
  const [followers, setFollowers] = useState([]);
  const [dismissedFollowers, setDismissedFollowers] = useState([]);
  const [followees, setFollowees] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const removeFromArr = (setMethod, doc) => {
    setMethod((pre) => {
      let rv = [...pre];
      let idx;
      rv.forEach((r, i) => {
        if (r._id === doc._id) idx = i;
      });
      rv.splice(idx, 1);
      return rv;
    });
  };

  const getFollowers = async (lastDocID) => {
    let rv = await getPendingFollowers(lastDocID);
    setFollowers((pre) => {
      let set = rv;
      if (lastDocID) set = [...pre, ...rv];
      return set;
    });
  };

  const getDismissedFollowers = async (lastDocID) => {
    let rv = await getPendingFollowers(lastDocID);
    setDismissedFollowers((pre) => {
      let set = rv;
      if (lastDocID) set = [...pre, ...rv];
      return set;
    });
  };

  const getFollowees = async (lastDocID) => {
    let rv = await getPendingFollowees(lastDocID);
    setFollowees((pre) => {
      let set = rv;
      if (lastDocID) set = [...pre, ...rv];
      return set;
    });
  };
  const accept = async (r) => {
    let rv = await acceptPendingFollower(r);
    removeFromArr(setFollowers, r);
  };

  const dismiss = async (r) => {
    let rv = await dismissFollowerPending(r);
    removeFromArr(setFollowers, r);
  };

  const unfollow = async (r) => {
    let rv = await deleteFollowee(r);
    removeFromArr(setFollowees, r);
  };

  const removeFollower = async (r) => {
    let rv = await deleteFollower(r);
    removeFromArr(setFollowers, r);
  };

  const closeModal = () => {
    setOpenModal(false);
  };

  return (
    <div>
      <Button
        size="lg"
        onClick={() => {
          setOpenModal(true);
        }}
      >
        pending
      </Button>
      <Modal
        style={{
          overlay: {
            // zIndex: "1000",
          },
          content: {
            top: "13%",
            bottom: "13%",
            left: "25%",
            right: "25%",
            fontFamily: "sans-serif",
          },
        }}
        isOpen={openModal}
        onAfterOpen={() => {
          getFollowers();
          getFollowees();
          getDismissedFollowers();
        }}
        onRequestClose={closeModal}
      >
        {followers.length > 0 && (
          <div>
            <h4 className="m-2">Followers Pending</h4>
            {followers.map((r) => {
              return (
                <div key={"followers" + r._id} className="row">
                  <Link
                    className="list-group-item list-group-item-action col m-2"
                    to={`/explore/users/${r.user._id}`}
                  >
                    {r.user.nickname}
                  </Link>
                  <Button className="m-2" onClick={() => accept(r)}>
                    accept
                  </Button>
                  <Button className="m-2" onClick={() => dismiss(r)}>
                    dismiss
                  </Button>
                  <Button className="m-2" onClick={() => removeFollower(r)}>
                    remove
                  </Button>
                </div>
              );
            })}
            <Button
              className="justify-content-center"
              onClick={() => getFollowers(followers[followers.length - 1]._id)}
            >
              get more
            </Button>
          </div>
        )}

        {followees.length > 0 && (
          <div>
            <h4 className="m-2">Followees Pending</h4>
            {followees.map((r) => {
              return (
                <div key={"followees" + r._id} className="row">
                  <Link
                    className="list-group-item list-group-item-action col m-2"
                    to={`/explore/users/${r.user._id}`}
                  >
                    {r.user.nickname}
                  </Link>
                  {/* <Button onClick={() => acceptPending(r)}>accept</Button> */}
                  <Button className="m-2" onClick={() => unfollow(r)}>
                    unfollow
                  </Button>
                </div>
              );
            })}
            <Button
              className="justify-content-center"
              onClick={() =>
                getDismissedFollowers(followees[followees.length - 1]._id)
              }
            >
              get more
            </Button>
          </div>
        )}

        {dismissedFollowers.length > 0 && (
          <div>
            <h4 className="m-2">Dismissed Followers</h4>
            {dismissedFollowers.map((r) => {
              return (
                <div key={"pendingFollowers" + r._id} className="row">
                  <Link
                    className="list-group-item list-group-item-action col m-2"
                    to={`/explore/users/${r.user._id}`}
                  >
                    {r.user.nickname}
                  </Link>
                  <Button className="m-2" onClick={() => accept(r)}>
                    accept
                  </Button>
                  <Button className="m-2" onClick={() => removeFollower(r)}>
                    remove
                  </Button>
                </div>
              );
            })}
            <Button
              className="justify-content-center"
              onClick={() =>
                getFollowees(
                  dismissedFollowers[dismissedFollowers.length - 1]._id
                )
              }
            >
              get more
            </Button>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default Pending;
