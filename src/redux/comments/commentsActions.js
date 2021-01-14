import { AuthedAxios } from "../../rest/axiosTypes";
import { filterExistingContents } from "../utils";
import {
  COMMENTS_APPEND_TO_END,
  COMMENTS_APPEND_TO_FRONT,
  COMMENTS_SET,
} from "./commentsTypes";

export const appendCommentsToFront = (comments) => {
  return {
    type: COMMENTS_APPEND_TO_FRONT,
    payload: comments,
  };
};

export const appendCommentsToEnd = (comments) => {
  return {
    type: COMMENTS_APPEND_TO_END,
    payload: comments,
  };
};

export const setComments = (comments) => {
  return {
    type: COMMENTS_SET,
    payload: comments,
  };
};

export const clearComments = () => {
  return {
    type: COMMENTS_SET,
    payload: [],
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
  AuthedAxios()
    .get(`comments/${postID}`)
    .then((r) => {
      dispatch(setComments(r.data));
    })
    .catch((e) => {
      console.log(e);
    });
};
const getIdxOfMatchingID = (arr = [], elem) => {
  let idx;
  arr.forEach((r, i) => {
    if (r._id === elem._id) {
      idx = i;
      return;
    }
  });
  return idx;
};

export const deleteComment = (targetComment) => (dispatch, getState) => {
  AuthedAxios()
    .delete(`comments/${targetComment._id}`)
    .then((r) => {
      let oldComments = [...getState().comments];
      let toSetAs;

      if (targetComment.parentComID) {
        // let commentIdx =
        let oldSubComs, comIdx;
        oldComments.forEach((r, i) => {
          if (r._id === targetComment.parentComID) {
            oldSubComs = [...r.subComments];
            comIdx = i;
            return;
          }
        });
        let rmSubcomIdx = getIdxOfMatchingID(oldSubComs, targetComment);

        // remove subcomment and set new subcomments array
        oldSubComs.splice(rmSubcomIdx, 1);
        oldComments[comIdx].subComments = oldSubComs;
        toSetAs = oldComments;
      } else {
        toSetAs = oldComments.filter((comment) => {
          return comment._id !== targetComment._id ? true : false;
        });
      }

      dispatch(setComments(toSetAs));
    })
    .catch((e) => {
      console.log(e);
    });
};

export const getMoreComments = (postID, lastComment) => (
  dispatch,
  getState
) => {
  let path = `comments/${postID}`;
  if (lastComment) {
    path += `?last-created-at=${lastComment.createdAt}`;
  }
  AuthedAxios()
    .get(path)
    .then((r) => {
      dispatch(
        appendCommentsToEnd(filterExistingContents(getState().comments, r.data))
      );
    })
    .catch((e) => {
      console.log(e);
    });
};

export const getMoreSubComments = (parentComID, lastComment) => (
  dispatch,
  getState
) => {
  let path = `comments/subcomments/${parentComID}`;
  if (lastComment) {
    path += `?last-created-at=${lastComment.createdAt}`;
  }
  AuthedAxios()
    .get(path)
    .then((r) => {
      let oldComments = [...getState().comments];
      let oldSubComs, idx;
      oldComments.forEach((r, i) => {
        if (r._id === parentComID) {
          oldSubComs = r.subComments;
          idx = i;
        }
      });

      let toAppend = filterExistingContents(oldSubComs, r.data);

      oldComments[idx].subComments = [...oldSubComs, ...toAppend];

      dispatch(setComments(oldComments));
    })
    .catch((e) => {
      console.log(e);
    });
};

export const postComment = (postID, parentCommentID = null, content) => (
  dispatch,
  getState
) => {
  let data = { postID, content };

  if (parentCommentID) data.parentComID = parentCommentID;

  AuthedAxios()
    .post("comments", data)
    .then((r) => {
      if (parentCommentID) {
        let comments = [...getState().comments];
        let set = comments.map((comment) => {
          if (comment._id === parentCommentID) {
            if (comment.subComments) {
              comment.subComments.unshift(r.data);
            } else {
              comment.subComments = [r.data];
            }
          }
          return comment;
        });
        dispatch(setComments(set));
      } else {
        dispatch(appendCommentsToFront([r.data]));
      }
    })
    .catch((e) => {
      console.log(e);
    });
};

export const postCommentReaction = (commentID, idx, reaction) => (
  dispatch,
  getState
) => {
  AuthedAxios()
    .post("/comments/react", { commentID: commentID, reaction: reaction })
    .then((r) => {
      let updatedComments = JSON.parse(JSON.stringify(getState().comments));
      if (idx.length > 1) {
        updatedComments[idx[0]].subComments[idx[1]].reactions =
          r.data.reactions;
        updatedComments[idx[0]].subComments[idx[1]].userReaction =
          r.data.userReaction;
      } else {
        updatedComments[idx[0]].reactions = r.data.reactions;
        updatedComments[idx[0]].userReaction = r.data.userReaction;
      }
      dispatch(setComments(updatedComments));
    })
    .catch((e) => {
      console.log(e);
    });
};

export const deleteCommentReaction = (commentID, idx) => (
  dispatch,
  getState
) => {
  AuthedAxios()
    .delete(`/comments/react/${commentID}`)
    .then((r) => {
      let updatedComments = JSON.parse(JSON.stringify(getState().comments));
      if (idx.length > 1) {
        updatedComments[idx[0]].subComments[idx[1]].reactions =
          r.data.reactions;
        updatedComments[idx[0]].subComments[idx[1]].userReaction =
          r.data.userReaction;
      } else {
        updatedComments[idx[0]].reactions = r.data.reactions;
        updatedComments[idx[0]].userReaction = r.data.userReaction;
      }
      dispatch(setComments(updatedComments));
    })
    .catch((e) => {
      console.log(e);
    });
};
