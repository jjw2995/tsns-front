// import { keepTokensFresh } from "../auth/AuthActions";
import BaseUrlAxios from "../AuthedAxios";
import { filterExistingContents } from "../utils";
import {
  COMMENTS_APPEND_TO_END,
  COMMENTS_APPEND_TO_FRONT,
  COMMENTS_SET,
} from "./commentsTypes";

// export const setPostID = (postID) => {
//   return {
//     type: COMMENTS_SET_POSTID,
//     payload: { postID: postID },
//   };
// };

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
  BaseUrlAxios(getState().auth.accessToken)
    .get(`comments/${postID}`)
    .then((r) => {
      dispatch(setComments(r.data));
    })
    .catch((e) => {
      console.log(e);
    });
};
const getIdxOfMatchingID = (arr = [], elem) => {
  // console.log("@ getIdxOfMatchingID: ");
  // console.log(arr);
  // console.log(elem);
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
  BaseUrlAxios(getState().auth.accessToken)
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
        // console.log("deleteComment, subcom: ", oldSubComs);
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
  BaseUrlAxios(getState().auth.accessToken)
    .get(`comments/${postID}?last-created-at=${lastComment.createdAt}`)
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
  BaseUrlAxios(getState().auth.accessToken)
    .get(
      `comments/${parentComID}/subcomments?last-created-at=${lastComment.createdAt}`
    )
    .then((r) => {
      let oldComments = [...getState().comments];
      let oldSubComs, idx;
      oldComments.forEach((r, i) => {
        if (r._id === parentComID) {
          oldSubComs = r.subComments;
          idx = i;
        }
      });

      // console.log("moreSubComments: ", r.data);

      let toAppend = filterExistingContents(oldSubComs, r.data);

      oldComments[idx].subComments = [...oldSubComs, ...toAppend];

      dispatch(setComments(oldComments));
    })
    .catch((e) => {
      console.log(JSON.parse(JSON.stringify(e)));
    });
};

export const postComment = (postID, parentCommentID = null, content) => (
  dispatch,
  getState
) => {
  let data = { postID, content };

  if (parentCommentID) data.parentComID = parentCommentID;

  BaseUrlAxios(getState().auth.accessToken)
    .post("comments", data)
    .then((r) => {
      // console.log(r);
      if (parentCommentID) {
        // console.log(postID);
        // console.log(parentCommentID);
        // console.log(content);
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
        // console.log("postComment, subcomment: ");
        // console.log(set);
        dispatch(setComments(set));
      } else {
        dispatch(appendCommentsToFront([r.data]));
      }
    })
    .catch((e) => {
      console.log(e);
      console.log(JSON.parse(JSON.stringify(e)));
    });
};

// //
// // import { keepTokensFresh } from "../auth/AuthActions";
// import BaseUrlAxios from "../AuthedAxios";
// import {
//   COMMENTS_APPEND_TO_END,
//   COMMENTS_APPEND_TO_FRONT,
//   COMMENTS_SET,
//   COMMENTS_SET_POSTID,
// } from "./commentsTypes";

// // export const setPostID = (postID) => {
// //   return {
// //     type: COMMENTS_SET_POSTID,
// //     payload: { postID: postID },
// //   };
// // };

// export const appendCommentsToFront = (comments) => {
//   return {
//     type: COMMENTS_APPEND_TO_FRONT,
//     payload: comments,
//   };
// };

// export const appendCommentsToEnd = (comments) => {
//   return {
//     type: COMMENTS_APPEND_TO_END,
//     payload: comments,
//   };
// };

// export const setComments = (comments) => {
//   return {
//     type: COMMENTS_SET,
//     payload: comments,
//   };
// };

// export const clearComments = () => {
//   return {
//     type: COMMENTS_SET,
//     payload: [],
//   };
// };

// /**
//  * check postID
//  *    if match, return
//  * reset
//  * fetch and append comments
//  * return
//  */

// export const getInitialComments = (postID) => (dispatch, getState) => {
//   BaseUrlAxios(getState().auth.accessToken)
//     .get(`comments/${postID}`)
//     .then((r) => {
//       dispatch(setComments(r.data));
//     })
//     .catch((e) => {
//       console.log(e);
//     });
// };

// export const deleteComment = (commentID) => (dispatch, getState) => {
//   BaseUrlAxios(getState().auth.accessToken)
//     .delete(`comments/${commentID}`)
//     .then((r) => {
//       dispatch(
//         setComments(
//           getState().comment.comments.filter((comment) => {
//             return comment._id !== commentID ? true : false;
//           })
//         )
//       );
//     })
//     .catch((e) => {
//       console.log(e);
//     });
// };

// const filterExistingComments = (old = [], incoming = []) => {
//   const set = new Set(
//     old.map((r) => {
//       return r._id;
//     })
//   );

//   return incoming.filter((com) => {
//     return !set.has(com._id);
//   });
// };

// export const getMoreComments = (postID, lastComment) => (
//   dispatch,
//   getState
// ) => {
//   BaseUrlAxios(getState().auth.accessToken)
//     .get(`comments/${postID}?last-created-at=${lastComment.createdAt}`)
//     .then((r) => {
//       dispatch(
//         appendCommentsToEnd(
//           filterExistingComments(getState().comment.comments, r.data)
//         )
//       );
//     })
//     .catch((e) => {
//       console.log(e);
//     });
// };

// export const getMoreSubComments = (parentComID, lastComment) => (
//   dispatch,
//   getState
// ) => {
//   BaseUrlAxios(getState().auth.accessToken)
//     // .get(`subcomments/${parentComID}?last-created-at=${lastComment.createdAt}`)
//     .get(`comments/${parentComID}/subcomments`)
//     // `/api/comments/${z.body[0]._id}/subcomments?num=5&last-created-at=${z.body[0].subComments[2].createdAt}`

//     .then((r) => {
//       let oldComments = [...getState().comment.comments];
//       let { oldSubComs, idx } = oldComments.map((r, i) => {
//         if (r._id === parentComID) return { oldSubComs: r.subComments, idx: i };
//       })[0];

//       console.log("moreSubComments: ", r.data);

//       let toAppend = filterExistingComments(oldSubComs, r.data);

//       oldComments[idx].subComments = [...oldSubComs, ...toAppend];

//       dispatch(setComments(oldComments));
//     })
//     .catch((e) => {
//       console.log(JSON.parse(JSON.stringify(e)));
//     });
// };

// export const postComment = (postID, parentCommentID = null, content) => (
//   dispatch,
//   getState
// ) => {
//   let data = { postID, content };

//   if (parentCommentID) data.parentComID = parentCommentID;

//   BaseUrlAxios(getState().auth.accessToken)
//     .post("comments", data)
//     .then((r) => {
//       // console.log(r);
//       if (parentCommentID) {
//         dispatch(
//           setComments(
//             getState().comment.comments.map((comment) => {
//               if (comment._id === parentCommentID) {
//                 comment.subComments.push(r.data);
//               }
//               return comment;
//             })
//           )
//         );
//       } else {
//         dispatch(appendCommentsToFront([r.data]));
//       }
//     })
//     .catch((e) => {
//       console.log(e);
//       console.log(JSON.parse(JSON.stringify(e)));
//     });
// };
