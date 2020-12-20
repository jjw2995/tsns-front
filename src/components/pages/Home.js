import { Button } from "react-bootstrap";
import React, { useState } from "react";
import Modal from "react-modal";
import PostForm from "../forms/PostForm";
import Posts, { endpoints } from "../PostComponent/Posts";

Modal.setAppElement("#root");

function Home(props) {
  // TODO: fix after postForm
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const closeModal = () => {
    setModalIsOpen(false);
  };
  // useEffect(() => {}, [modalIsOpen]);

  return (
    <div>
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
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
      >
        <div className="d-flex justify-content-end">
          <Button
            size="lg"
            onClick={() => {
              setModalIsOpen(false);
            }}
          >
            Close
          </Button>
        </div>
        <div className="d-flex justify-content-center">
          <PostForm closeForm={closeModal} />
        </div>
      </Modal>

      <Posts endPoint={endpoints().HOME} />
      {/* <div></div> */}
      <div
        className="d-flex justify-content-end fixed-bottom"
        style={{ pointerEvents: "none" }}
      >
        <div></div>
        <Button
          onClick={() => {
            setModalIsOpen(true);
          }}
          variant="secondary"
          size="lg"
          className="mb-5 mr-5"
          style={{ left: "100px", top: "150px", pointerEvents: "initial" }}
        >
          <h4>
            new <b>Post</b>
          </h4>
        </Button>
      </div>
    </div>
  );
}

export default Home;
