import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  deleteComment,
  deleteCommentReaction,
  postCommentReaction,
} from "../../redux/comments/commentsActions";

import Reactions from "../Reactions";
import UserLink from "../UserLink";

function CommentBase({ comment, idx }) {
  const {
    content,
    createdAt,
    reactions,
    user: commentOwner,
    userReaction,
    _id: commentID,
  } = comment;

  let date = new Date(createdAt).toISOString().split("T")[0].replace(/-/g, "/");

  const [expandText, setExpandText] = useState(false);

  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const deleteHandler = () => {
    dispatch(deleteComment(comment));
  };

  const postReact = (reaction) => {
    dispatch(postCommentReaction(commentID, idx, reaction));
  };

  const deleteReact = () => {
    dispatch(deleteCommentReaction(commentID, idx));
  };

  return (
    <div
      className="d-flex container card pb-1"
      style={{ width: "90%", justifyContent: "center" }}
      key={commentID}
    >
      <div className="row justify-content-center">
        <div className="col-auto mr-auto ml-1">
          <UserLink
            className="row"
            style={{ textDecoration: "none", color: "inherit" }}
            userID={commentOwner._id}
          >
            <b>{commentOwner.nickname}</b>
          </UserLink>

          <small style={{ fontSize: "0.8em" }} className="row">
            {date}
          </small>
        </div>
        <div
          onClick={() => {
            setExpandText(!expandText);
          }}
          className={
            expandText
              ? "card-text show-white-space col"
              : "hidden-text card-text show-white-space col"
          }
          style={{
            columnWidth: "80%",
            lineHeight: "normal",
            fontSize: "1em",
            margin: "2px",
          }}
        >
          <div>{content}</div>
        </div>
        <Reactions
          contentID={commentID}
          userReaction={userReaction}
          reactions={reactions}
          postReact={postReact}
          deleteReact={deleteReact}
          style={{ fontSize: "0.7rem" }}
        />
        <div>
          {user._id === comment.user._id && (
            <button
              className="btn btn-outline m-0 p-0 px-1"
              onClick={() => {
                deleteHandler();
              }}
            >
              x
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default CommentBase;
