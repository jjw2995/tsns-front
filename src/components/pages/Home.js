import { Button } from "react-bootstrap";
import React, { useState } from "react";
import Posts from "../PostComponent/Posts";
import Modal from "react-modal";
import PostForm from "../forms/PostForm";

Modal.setAppElement("#root");

function Home(props) {
  // TODO: fix after postForm
  let [modalIsOpen, setModalIsOpen] = useState(false);
  modalIsOpen = true;

  return (
    <div>
      <Modal
        // className="m-10 p-10 fixed-top"
        style={{
          overlay: {
            // backgroundColor: "grey",
          },
          content: {
            top: "13%",
            bottom: "13%",
            left: "20%",
            right: "20%",
            fontFamily: "sans-serif",
            // color: "",
            // alignSelf: "center",
          },
        }}
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
      >
        <div className="d-flex justify-content-end">
          <Button
            size="lg"
            // className=""
            onClick={() => {
              setModalIsOpen(false);
            }}
          >
            Close
          </Button>
        </div>
        <div className="d-flex justify-content-center">
          <PostForm />
        </div>
      </Modal>
      <Posts />
      <div className="d-flex justify-content-end fixed-bottom">
        <Button
          onClick={() => {
            setModalIsOpen(true);
          }}
          variant="secondary"
          size="lg"
          className="m-5"
        >
          <h4>
            upload a <b>Post</b>
          </h4>
        </Button>
      </div>
    </div>
  );
}

export default Home;
