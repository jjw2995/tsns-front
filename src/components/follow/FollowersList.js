import Modal from "react-modal";
import React, { useState } from "react";
import BaseUrlAxios from "../../rest/AuthedAxios";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import FollowLinkItem from "./FollowLinkItem";
import { useSelector } from "react-redux";

function FollowersList({ title, isShow, uid }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [followers, setFollowers] = useState([]);
  const loggedID = useSelector((state) => state.auth.user._id);
  console.log(loggedID);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);
  const getFollows = () => {
    BaseUrlAxios()
      .get(`/followers/${uid}`)
      .then((r) => {
        console.log(r.data);
        setFollowers(r.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getMoreFollows = () => {
    let path = `/followers/${uid}`;

    if (followers && followers.length > 0) {
      path += `?last-doc-id=${followers[followers.length - 1]._id}`;
    }
    BaseUrlAxios()
      .get(path)
      .then((r) => {
        console.log(r.data);
        setFollowers((pre) => {
          console.log([...pre, ...r.data]);
          return [...pre, ...r.data];
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const removeFollower = (followDoc, idx) => {
    console.log(idx);
    BaseUrlAxios()
      .delete(`/followers/${followDoc.user._id}`, {
        _id: followDoc.user._id,
      })
      .then((r) => {
        console.log(r.data);
        setFollowers((pre) => {
          let newArr = [...pre];
          newArr.splice(idx, 1);
          return newArr;
        });
      });
  };

  return (
    <div>
      <Button
        disabled={!isShow}
        className="m-2"
        onClick={() => {
          if (isShow) {
            openModal();
          }
        }}
      >
        <h4>{title}</h4>
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
        isOpen={modalIsOpen}
        onAfterOpen={getFollows}
        onRequestClose={closeModal}
      >
        <h3>Followers</h3>
        {followers &&
          followers.length > 0 &&
          followers.map((r, i) => {
            return (
              <FollowLinkItem item={r} key={"followers" + r._id}>
                {uid === loggedID ? (
                  <Button className="m-2" onClick={() => removeFollower(r, i)}>
                    remove
                  </Button>
                ) : (
                  <div />
                )}
              </FollowLinkItem>
              // <Link
              //   key={r._id}
              //   className="list-group-item list-group-item-action m-2"
              //   to={`/explore/users/${r.user._id}`}
              // >
              //   <h4>{r.user.nickname}</h4>
              // </Link>
            );
          })}
        <div className="justify-content-center d-flex">
          <button className="btn btn-secondary " onClick={getMoreFollows}>
            get more
          </button>
        </div>
        <Button
          variant="dark"
          style={{
            position: "absolute",
            right: "0",
            top: "0",
            zIndex: "1",
          }}
          type="button"
          onClick={closeModal}
        >
          x
        </Button>
      </Modal>
    </div>
  );
}

export default FollowersList;
