import Modal from "react-modal";
import React, { useState } from "react";
import BaseUrlAxios from "../../rest/AuthedAxios";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function FollowersList({ title, isShow }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [follows, setFollows] = useState();

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);
  const getFollows = () => {
    BaseUrlAxios()
      .get(`/followers`)
      .then((r) => {
        console.log(r.data);
        setFollows(r.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getMoreFollows = () => {
    if (follows && follows.length > 0) {
      console.log(follows[follows.length - 1]._id);
      BaseUrlAxios()
        .get(`/followers?last-doc-id=${follows[follows.length - 1]._id}`)
        .then((r) => {
          console.log(r.data);
          setFollows((pre) => {
            console.log([...pre, ...r.data]);
            return [...pre, ...r.data];
          });
        })
        .catch((e) => {
          console.log(e);
        });
    }
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
        {follows &&
          follows.length > 0 &&
          follows.map((r) => {
            return (
              <Link
                key={r._id}
                className="list-group-item list-group-item-action m-2"
                to={`/explore/users/${r.user._id}`}
              >
                <h4>{r.user.nickname}</h4>
              </Link>
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
