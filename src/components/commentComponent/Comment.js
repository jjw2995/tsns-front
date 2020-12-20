import React from "react";
import { useDispatch } from "react-redux";
import { getMoreSubComments } from "../../redux/comments/commentsActions";
import CommentForm from "../forms/CommentForm";
import CommentBase from "./CommentBase";

function Comment({ comment }) {
  const dispatch = useDispatch();

  return (
    <div>
      <CommentBase comment={comment} />
      <div className="pl-3">
        {comment.subComments &&
          comment.subComments.map((subcom) => {
            return <CommentBase comment={subcom} key={subcom._id} />;
          })}
        <div
          className="d-flex justify-content-end"
          style={{ paddingRight: "5%", paddingBottom: "1%" }}
        >
          {comment.subComments && comment.subComments.length > 0 && (
            <button
              onClick={() => {
                dispatch(
                  getMoreSubComments(
                    comment._id,
                    comment.subComments[comment.subComments.length - 1]
                  )
                );
              }}
              className="btn btn-dark m-0 py-0 px-1"
            >
              more subComments
            </button>
          )}
          <CommentForm postID={comment.postID} parentCommentID={comment._id} />
        </div>
      </div>
    </div>
  );
}

export default Comment;
