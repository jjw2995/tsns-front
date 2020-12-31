import React from "react";
import Modal from "react-modal";
import PostForm from "../forms/PostForm";
import Posts, { endpoints } from "../postComponent/Posts";
import MyModal from "../myComponents/MyModal";
import { isSmallWindow } from "../../utils";

Modal.setAppElement("#root");

function Home(props) {
  return (
    <div>
      <Posts endPoint={endpoints().HOME} />
      <div
        className="d-flex justify-content-end fixed-bottom"
        style={{ pointerEvents: "none" }}
      >
        <div
          style={{
            paddingRight: isSmallWindow ? "5rem" : "2rem",
            paddingBottom: isSmallWindow ? "" : "2rem",
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
