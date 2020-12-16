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
  const [itemCount, setItemCount] = useState(0);
  // modalIsOpen = true;
  const posts = useSelector((state) => state.post.posts);

  // useEffect((prev) => {
  //   console.log(posts.length);
  //   setItemCount((pre) => {
  //     return posts.length;
  //   });
  // }, []);

  // console.log(posts);
  console.log("itemCount: ", itemCount);
  console.log("posts.length: ", posts.length);

  // useEffect

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPost(getPostEndpoints().HOME));
  }, []);

  const fetchMore = () => {
    console.log("here");
    // console.log(posts[posts.length - 1].createdAt);
    setItemCount(posts.length);
    dispatch(
      getPost(getPostEndpoints().HOME, posts[posts.length - 1].createdAt)
    );
  };
  return (
    <div>
      {/* <pre>{JSON.stringify(posts)}</pre> */}
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
      <div>
        {/* <Post post={posts[0]} />
        <Post post={posts[1]} /> */}
        <Posts posts={posts} fetchMore={fetchMore} />
        {/* {posts.map((r) => {
          return (
            <Post post={r} key={r._id} />
            // <div>
            // </div>
          );
        })} */}
      </div>
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
