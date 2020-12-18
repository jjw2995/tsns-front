import { Field, Formik, Form } from "formik";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  postComment,
  getInitialComments,
  setComments,
} from "../../redux/comments/commentsActions";
import CommentForm from "../forms/CommentForm";
import Comment from "./Comment";

function CommentSection({ postID }) {
  const comments = useSelector(
    (state) => state.comment.comments
    // () => {}
  );
  // console.log("CommentSection: ", comments);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(getPost(getPostEndpoints().HOME));
  // }, []);

  // useEffect(() => {
  //   if (isOpen) {
  //     dispatch(getComments(postID));
  //   }
  // }, []);
  // const fetchMore = () => {
  //   console.log("here");
  //   dispatch(getComments(postID));
  // };
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
        isOpen={isOpen}
        onAfterOpen={() => {
          console.log("here?");
          dispatch(getInitialComments(postID));
        }}
        onRequestClose={() => {
          dispatch(setComments([]));
          setIsOpen(false);
        }}
      >
        <div className="d-flex flex-column">
          <div>
            {comments.map((r, i) => {
              return <Comment comment={r} key={r._id} />;
            })}
          </div>

          <CommentForm postID={postID}>{/* post comment */}</CommentForm>
        </div>
      </Modal>

      <Button
        className="btn-secondary"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        comments
      </Button>
    </div>
  );
}

export default CommentSection;
