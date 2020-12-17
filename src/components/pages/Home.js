import { Button } from "react-bootstrap";
import React, { useState, useEffect } from "react";
// import Posts from "../PostComponent/Posts";
import Modal from "react-modal";
import PostForm from "../forms/PostForm";

import { useDispatch, useSelector } from "react-redux";
import { getPost, getPostEndpoints } from "../../redux/posts/postsActions";
import Posts from "../PostComponent/Posts";
Modal.setAppElement("#root");

function Home(props) {
  // TODO: fix after postForm
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const posts = useSelector(
    (state) => state.post.posts,
    () => {}
  );
  console.log("posts from Home: ", posts);

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPost(getPostEndpoints().HOME));
  }, []);

  const fetchMore = () => {
    console.log("here");
    dispatch(
      getPost(getPostEndpoints().HOME, posts[posts.length - 1].createdAt)
    );
  };
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

      <Posts posts={posts} fetchMore={fetchMore} />

      <div className="d-flex justify-content-end fixed-bottom">
        <Button
          onClick={() => {
            setModalIsOpen(true);
          }}
          variant="secondary"
          size="lg"
          className="mb-5 mr-5"
          style={{ left: "100px", top: "150px" }}
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
