// import { keepTokensFresh } from "../auth/AuthActions";
import BaseUrlAxios from "../AuthedAxios";
import {
  COMMENTS_APPEND_TO_END,
  COMMENTS_APPEND_TO_FRONT,
  COMMENTS_SET,
  COMMENTS_SET_POSTID,
} from "./commentsTypes";

export const setPostID = (postID) => {
  return {
    type: COMMENTS_SET_POSTID,
    payload: { postID: postID },
  };
};

export const appnedNewComment = (comment) => {
  return {
    type: COMMENTS_APPEND_TO_END,
    payload: [comment],
  };
};

export const appendCommentsToFront = (comments) => {
  return {
    type: COMMENTS_APPEND_TO_FRONT,
    payload: comments,
  };
};

export const setComments = (comments) => {
  return {
    type: COMMENTS_SET,
    payload: { comments: comments },
  };
};

/**
 * check postID
 *    if match, return
 * reset
 * fetch and append comments
 * return
 */

export const getInitialComments = (postID) => (dispatch, getState) => {
  // dispatch(keepTokensFresh());
  console.log("여기: ", getState().comment.postID);
  // if (getState().comment.postID !== postID) {
  BaseUrlAxios(getState().auth.accessToken)
    .get(`comments/${postID}`)
    .then((r) => {
      dispatch(setComments(r.data));
      // console.log("getComments: ");
      // console.log(r.data);
      // dispatch(setPostID(postID));
    })
    .catch((e) => {
      console.log(e);
    });
  // }
};

export const deleteComment = (commentID) => (dispatch, getState) => {
  BaseUrlAxios(getState().auth.accessToken)
    .delete(`comments/${commentID}`)
    .then((r) => {
      console.log("deleted comment ", r.data);
      dispatch(
        setComments(
          getState().comment.comments.filter((comment) => {
            return comment._id !== commentID ? true : false;
          })
        )
      );
    })
    .catch((e) => {
      console.log(e);
    });
};

export const getMoreComments = (postID) => (dispatch, getState) => {};

export const postComment = (postID, parentCommentID, content) => (
  dispatch,
  getState
) => {
  // dispatch(keepTokensFresh());
  console.log("여기왔냐");
  BaseUrlAxios(getState().auth.accessToken)
    .post("comments", {
      postID,
      content,
    })
    .then((r) => {
      console.log(r);
      dispatch(appnedNewComment(r.data));
    })
    .catch((e) => {
      console.log(e);
    });
};
