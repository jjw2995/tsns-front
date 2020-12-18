import Axios from "axios";
import BaseUrlAxios from "../AuthedAxios";
import { filterExistingContents } from "../utils";
import {
  ADD_POSTS_TO_END,
  ADD_POSTS_TO_FRONT,
  SET_POST,
  SET_REQ,
  CLEAR_POST,
  // CLEAR_POSTS,
} from "./postsTypes";
// postPost
// firstFetchPosts
// continueFetchPosts
//

const genPayload = (newPosts = [], newIsLoading = null) => {
  let rv = {};
  if (newPosts) rv.posts = newPosts;
  if (newIsLoading !== null) rv.isLoading = newIsLoading;
  return rv;
};

export const appendPostsEnd = (posts) => {
  return {
    type: ADD_POSTS_TO_END,
    payload: genPayload(posts),
  };
};

export const appendPostFront = (post) => {
  return {
    type: ADD_POSTS_TO_FRONT,
    payload: genPayload([post]),
  };
};

export const setPosts = (posts) => {
  return {
    type: SET_POST,
    payload: { posts: posts },
  };
};

export const setReq = (isLoading) => {
  return {
    type: SET_REQ,
    payload: { isLoading: isLoading },
  };
};

export const clearPost = () => {
  return {
    type: CLEAR_POST,
    payload: {},
  };
};

// export const errPost = (e) => {
//   // msg(JSON.stringify(e));
//   return {
//     type: ERR_POST,
//     payload: e,
//   };
// };

// export const appendPostFront = (post) => (dispatch, getState) => {
//   const old = getState().post;
//   if (old.isLoading) return;
//   dispatch(setReq(true));

//   dispatch(setPosts([post, ...old.posts]));

//   dispatch(setReq(false));
// };

export const postPost = (postFormData) => (dispatch, getState) => {
  console.log(postFormData);
  // console.log(getState().auth.accessToken);
  BaseUrlAxios(getState().auth.accessToken, true)
    .post("/posts", postFormData)
    .then((r) => {
      dispatch(appendPostFront(r.data));
    })
    .catch((e) => {
      console.log(e);
      console.log(e.data);
    });
};

export const getPostEndpoints = (userID = "") => {
  return {
    HOME: "/posts/",
    EXPLORE: "/posts/explore/",
    MINE: "/posts/mine/",
    USER: `/posts/user/${userID}`,
  };
};

// GET/api/posts
// GET/api/posts/mine
// GET/api/posts/explore
// GET/api/posts/user/{userID}

export const getPost = (path, lastCreated = null) => (dispatch, getState) => {
  let a;
  BaseUrlAxios(getState().auth.accessToken)
    .get(path, {
      params: { "last-created-at": lastCreated },
      createdAt: lastCreated,
    })
    .then((r) => {
      if (r.data.length > 0) {
        // filter duplicate
        // console.log("NEW DATA\n", r.data);

        dispatch(
          appendPostsEnd(filterExistingContents(getState().post.posts, r.data))
        );
      }
    })
    .catch((e) => {
      console.log(e);
      console.log(e.message);
    });
};

export const deletePost = (postID) => (dispatch, getState) => {
  BaseUrlAxios(getState().auth.accessToken)
    .delete(`${getPostEndpoints().HOME}${postID}`)
    .then((r) => {
      let updatedPosts = [...getState().post.posts];
      updatedPosts.forEach((val, idx) => {
        if (val._id === postID) updatedPosts.splice(idx, 1);
      });

      dispatch(setPosts(updatedPosts));
    });
};

// Axios.post("/posts", postBody, {
//   headers: { Authorization: `Bearer ${getState().auth.accessToken}` },
// })
//   .then((r) => {
//     console.log(r);
//   })
//   .catch((e) => {
//     console.log(e);
//     console.log(e.data);
//   });
