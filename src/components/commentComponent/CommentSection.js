// import { Field, Formik, Form } from "formik";
import React, { useState } from "react";
import Modal from "react-modal";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  getInitialComments,
  clearComments,
  getMoreComments,
} from "../../redux/comments/commentsActions";
import CommentForm from "../forms/CommentForm";
import Comment from "./Comment";

function CommentSection({ postID }) {
  const comments = useSelector((state) => state.comments);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

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
          dispatch(getInitialComments(postID));
        }}
        onRequestClose={() => {
          dispatch(clearComments());
          setIsOpen(false);
        }}
      >
        <div className="d-flex flex-column" style={{ overflowY: "auto" }}>
          {comments.map((r, i) => {
            return <Comment comment={r} idx={[i]} key={r._id} />;
          })}
        </div>

        <div className="d-flex justify-content-center">
          <button
            type="button"
            onClick={() => {
              dispatch(getMoreComments(postID, comments[comments.length - 1]));
            }}
            className="btn btn-dark m-0 py-0 px-1"
          >
            more comments
          </button>
          <CommentForm postID={postID} />
        </div>
      </Modal>

      <Button
        type="button"
        className="btn-secondary my-2"
        style={{ fontSize: "1.3rem" }}
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
