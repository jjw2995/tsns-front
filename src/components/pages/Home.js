import React, { useState } from "react";
import Modal from "react-modal";
import PostForm from "../forms/PostForm";
import Posts, { endpoints } from "../post/Posts";
import { isSmallWindow } from "../../utils";
import { Button } from "react-bootstrap";
import CloseButton from "../myComponents/CloseButton";

Modal.setAppElement("#root");

function Home(props) {
  const [open, setOpen] = useState(false);
  const closeModal = () => {
    setOpen(false);
  };
  const openModal = () => {
    setOpen(true);
  };

  // console.log("in Home");

  return (
    <div>
      <div style={{ textAlign: "center" }}>
        <h6>
          get all user's posts and user's followers' (public and followers)
          posts ordered by date
        </h6>
      </div>
      <Posts endPoint={endpoints().HOME} />
      <div
        className="d-flex justify-content-end fixed-bottom"
        style={{ pointerEvents: "none" }}
      >
        <div
          style={{
            paddingRight: isSmallWindow ? "2.5rem" : "3rem",
            paddingBottom: isSmallWindow ? "" : "2rem",
            pointerEvents: "none",
          }}
        >
          <Modal
            style={{
              overlay: {
                zIndex: "1000",
              },
              content: {
                top: "13%",
                bottom: "13%",
                left: "20%",
                right: "20%",
                fontFamily: "sans-serif",
              },
            }}
            isOpen={open}
            onRequestClose={closeModal}
          >
            <CloseButton onClickHandler={closeModal} />
            <PostForm closeModal={closeModal} />
          </Modal>
          {isSmallWindow ? (
            <Button className="btn-secondary" onClick={openModal}>
              <b>+</b>
            </Button>
          ) : (
            <Button
              className="btn-secondary"
              size="lg"
              style={{ pointerEvents: "initial" }}
              onClick={openModal}
            >
              new Post
            </Button>
          )}
          {/* <MyModal buttonName="new Post"></MyModal> */}
        </div>
      </div>
    </div>
  );
}

export default Home;
