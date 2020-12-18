import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment } from "../../redux/comments/commentsActions";
import CommentForm from "../forms/CommentForm";

function Comment({ comment }) {
  const [expandText, setExpandText] = useState(false);

  let date = new Date(comment.createdAt)
    .toISOString()
    .split("T")[0]
    .replace(/-/g, "/");

  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const deleteHandler = () => {
    dispatch(deleteComment(comment._id));
  };

  // {user._id === postOwner._id && (
  //     <div style={{ marginLeft: "auto" }}>
  //       <Button
  //         type="button"
  //         onClick={() => {
  //           onDeleteHandler();
  //         }}
  //         style={{ zIndex: "1000" }}
  //         size="sm"
  //         variant="outline-dark"
  //       >
  //         delete
  //       </Button>
  //     </div>
  //   )}
  return (
    <div
      className="d-flex container card pb-1"
      style={{ width: "90%", justifyContent: "center" }}
      key={comment._id}
    >
      {/* <pre>{JSON.stringify(post)}</pre> */}
      {/* <div className="justify-content-center"> */}
      <div className="row justify-content-center">
        {/*  */}
        <div className="col-auto mr-auto ml-1">
          <b
            className="row"
            style={{ cursor: "pointer" }}
            onClick={() => {
              // TODO: to user's page
              console.log("c");
            }}
          >
            {comment.user.nickname}
          </b>
          <small style={{ fontSize: "7px" }} className="row">
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
        <div className="col-auto">
          reactions
          <CommentForm />
        </div>
        <div>
          <button
            style={{ marginLeft: "auto" }}
            onClick={() => {
              deleteHandler();
            }}
          >
            delete
          </button>
        </div>
      </div>

      {/* </div> */}
    </div>
  );
}

export default Comment;
