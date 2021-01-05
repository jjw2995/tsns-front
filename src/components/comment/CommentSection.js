import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  getInitialComments,
  clearComments,
  getMoreComments,
} from "../../redux/comments/commentsActions";
import CommentForm from "../forms/CommentForm";
import Comment from "./Comment";
import CloseButton from "../myComponents/CloseButton";
import MyModal from "../myComponents/MyModal";

function CommentSection({ postID }) {
  const comments = useSelector((state) => state.comments);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const openComments = () => {
    setIsOpen(true);
    dispatch(getInitialComments(postID));
  };

  const closeComments = () => {
    setIsOpen(false);
    dispatch(clearComments());
  };

  return (
    <div>
      <MyModal
        isOpen={isOpen}
        onAfterOpen={openComments}
        onRequestClose={closeComments}
      >
        <CloseButton onCloseHandler={closeComments} />
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
      </MyModal>
      <Button
        type="button"
        className="btn-secondary my-2"
        style={{ fontSize: "1.3rem" }}
        onClick={openComments}
      >
        comments
      </Button>
    </div>
  );
}

export default CommentSection;
