import { Button } from "react-bootstrap";
import React, { useState } from "react";
import Modal from "react-modal";
import PostForm from "../forms/PostForm";
import Posts, { endpoints } from "../PostComponent/Posts";
import MyModal from "../myComponents/MyModal";

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
      <Posts endPoint={endpoints().HOME} />
      <div
        className="d-flex justify-content-end fixed-bottom"
        style={{ pointerEvents: "none" }}
      >
        <div
          style={{
            paddingRight: "2rem",
            paddingBottom: "2rem",
            left: "100px",
            top: "150px",
            pointerEvents: "initial",
          }}
        >
          <MyModal buttonName="new Post">
            <PostForm />
          </MyModal>
        </div>
      </div>
    </div>
  );
}

export default Home;
