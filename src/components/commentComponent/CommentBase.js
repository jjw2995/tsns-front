import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment } from "../../redux/comments/commentsActions";
import CommentForm from "../forms/CommentForm";

function CommentBase({ comment }) {
  const [expandText, setExpandText] = useState(false);

  let date = new Date(comment.createdAt)
    .toISOString()
    .split("T")[0]
    .replace(/-/g, "/");

  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const deleteHandler = () => {
    dispatch(deleteComment(comment));
  };

  return (
    <div
      className="d-flex container card pb-1"
      style={{ width: "90%", justifyContent: "center" }}
      key={comment._id}
    >
      <div className="row justify-content-center">
        {/*  */}
        <div className="col-auto mr-auto ml-1">
          <b
            className="row"
            style={{ cursor: "pointer", fontSize: "13px" }}
            onClick={() => {
              // TODO: to user's page
              console.log("c");
            }}
          >
            {comment.user.nickname}
          </b>
          <small style={{ fontSize: "10px" }} className="row">
            {date}
          </small>
        </div>
        {/*  */}
        <div
          style={{ columnWidth: "80%" }}
          onClick={() => {
            setExpandText(!expandText);
          }}
          className={
            expandText
              ? "card-text show-white-space col"
              : "hidden-text card-text show-white-space col"
          }
          style={{ lineHeight: "normal", fontSize: "0.8em", margin: "2px" }}
        >
          <div>{comment.content}</div>
        </div>
        {/*  */}
        <div className="col-auto">reactions</div>
        <div>
          {user._id === comment.user._id && (
            <button
              className="btn btn-outline m-0 p-0 px-1"
              // style={{ marginLeft: "" }}
              onClick={() => {
                deleteHandler();
              }}
            >
              x
            </button>
          )}
        </div>
      </div>

      {/* </div> */}
    </div>
  );
}

export default CommentBase;
