import Modal from "react-modal";
import React, { useState } from "react";
import BaseUrlAxios from "../../rest/AuthedAxios";
import { Button } from "react-bootstrap";
import FollowLinkItem from "./FollowLinkItem";
import { useSelector } from "react-redux";

function FollowList({ title, isShow, uid, style, className, item }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [followers, setFollowers] = useState([]);
  const loggedID = useSelector((state) => state.auth.user._id);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);
  const getFollows = () => {
    BaseUrlAxios()
      .get(`/${item}/${uid}`)
      .then((r) => {
        setFollowers(r.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getMoreFollows = () => {
    let path = `${item}/${uid}`;

    if (followers && followers.length > 0) {
      path += `?last-doc-id=${followers[followers.length - 1]._id}`;
    }
    BaseUrlAxios()
      .get(path)
      .then((r) => {
        setFollowers((pre) => {
          return [...pre, ...r.data];
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const removeFollower = (followDoc, idx) => {
    BaseUrlAxios()
      .delete(`/followers/${followDoc.user._id}`, {
        _id: followDoc.user._id,
      })
      .then((r) => {
        setFollowers((pre) => {
          let newArr = [...pre];
          newArr.splice(idx, 1);
          return newArr;
        });
      });
  };

  return (
    <div style={style} className={className}>
      <Button
        disabled={!isShow}
        // className="m-2"
        variant="outline-dark"
        // size="sm"
        onClick={() => {
          if (isShow) {
            openModal();
          }
        }}
      >
        <b>{title}</b>
      </Button>
      <Modal
        style={{
          overlay: {
            zIndex: "2",
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
        <h3>{item}</h3>
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

export default FollowList;
