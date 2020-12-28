import Modal from "react-modal";
import React, { useState } from "react";
import BaseUrlAxios from "../../rest/AuthedAxios";
import { Button } from "react-bootstrap";
import FollowLinkItem from "./FollowLinkItem";
import { useSelector } from "react-redux";

function FolloweesList({ title, isShow, uid }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [followees, setFollowees] = useState();

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const loggedID = useSelector((state) => state.auth.user._id);

  const getFollows = () => {
    BaseUrlAxios()
      .get(`/followees/${uid}`)
      .then((r) => {
        setFollowees(r.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getMoreFollows = () => {
    let path = `/followees/${uid}`;

    if (followees && followees.length > 0) {
      path += `?last-doc-id=${followees[followees.length - 1]._id}`;
    }
    BaseUrlAxios()
      .get(path)
      .then((r) => {
        setFollowees((pre) => {
          return [...pre, ...r.data];
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const removeFollowee = (followDoc, idx) => {
    BaseUrlAxios()
      .delete(`/followees/${followDoc.user._id}`, {
        _id: followDoc.user._id,
      })
      .then((r) => {
        setFollowees((pre) => {
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
        <h3>Followees</h3>
        {followees &&
          followees.length > 0 &&
          followees.map((r, i) => {
            return (
              <FollowLinkItem item={r} key={"followers" + r._id}>
                {uid === loggedID ? (
                  <Button className="m-2" onClick={() => removeFollowee(r, i)}>
                    unfollow
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

export default FolloweesList;
