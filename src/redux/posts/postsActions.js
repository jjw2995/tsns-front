import BaseUrlAxios from "../../rest/AuthedAxios";
import { filterExistingContents } from "../utils";
import {
  ADD_NEW_POST,
  SET_POST,
  GET_MORE_POSTS,
  GET_INITIAL_POSTS,
} from "./postsTypes";

const genPayload = (newPosts = [], newIsLoading = null) => {
  let rv = {};
  if (newPosts) rv.posts = newPosts;
  if (newIsLoading !== null) rv.isLoading = newIsLoading;
  return rv;
};

const getMorePosts = (posts) => {
  return {
    type: GET_MORE_POSTS,
    payload: genPayload(posts),
  };
};

const getInitialPosts = (posts) => {
  return {
    type: GET_INITIAL_POSTS,
    payload: genPayload(posts),
  };
};

const addNewPost = (post) => {
  return {
    type: ADD_NEW_POST,
    payload: genPayload([post]),
  };
};

const setPosts = (posts) => {
  return {
    type: SET_POST,
    payload: { posts: posts },
  };
};

export const postPost = (postFormData) => (dispatch, getState) => {
  BaseUrlAxios(true)
    .post("/posts", postFormData)
    .then((r) => {
      dispatch(addNewPost(r.data));
    })
    .catch((e) => {
      console.log(e.data);
    });
};

export const getPostEndpoints = (userID = "") => {
  return {
    HOME: "/posts",
    EXPLORE: "/posts/explore",
    MINE: "/posts/mine",
    USER: `/posts/user/${userID}`,
  };
};

// GET/api/posts
// GET/api/posts/mine
// GET/api/posts/explore
// GET/api/posts/user/{userID}
export const pathEqlExplore = (path) => {
  return path.includes("explore");
};

export const getSetInitialPosts = (path, pageSize) => (dispatch, getState) => {
  console.log(path);
  if (pageSize) {
    path += `?num=${pageSize}`;
  }

  BaseUrlAxios()
    .get(path)
    .then((r) => {
      console.log("getPost r.data", r.data);
      dispatch(
        getInitialPosts(filterExistingContents(getState().post.posts, r.data))
      );
    })
    .catch((e) => {
      console.log(e.response);
    });
};

export const getSetMorePosts = (
  path,
  last_Created_OR_ReactionsCount,
  pageSize
) => (dispatch, getState) => {
  path += "?";
  path +=
    (pathEqlExplore(path) ? `last-reactions-count=` : `last-created-at=`) +
    `${last_Created_OR_ReactionsCount}`;
  path += pageSize ? `&num=${pageSize}` : "";

  console.log(path);

  BaseUrlAxios()
    .get(path)
    .then((r) => {
      console.log("getSetMorePosts r.data", r.data);
      dispatch(
        getMorePosts(filterExistingContents(getState().post.posts, r.data))
      );
    })
    .catch((e) => {
      console.log(e.response);
    });
};

export const deletePost = (postID) => (dispatch, getState) => {
  BaseUrlAxios()
    .delete(`${getPostEndpoints().HOME}/${postID}`)
    .then((r) => {
      let updatedPosts = [...getState().post.posts];
      updatedPosts.forEach((val, idx) => {
        if (val._id === postID) updatedPosts.splice(idx, 1);
      });

      dispatch(setPosts(updatedPosts));
    });
};

export const postPostReaction = (postID, idx, reaction) => (
  dispatch,
  getState
) => {
  BaseUrlAxios()
    .post("/posts/react", { postID: postID, reaction: reaction })
    .then((r) => {
      console.log(r.data);
      let updatedPosts = [...getState().post.posts];
      updatedPosts[idx].reactions = r.data.reactions;
      updatedPosts[idx].userReaction = r.data.userReaction;
      dispatch(setPosts(updatedPosts));
    })
    .catch((e) => {
      console.log(e);
    });
};

export const deletePostReaction = (postID, idx) => (dispatch, getState) => {
  BaseUrlAxios()
    .delete(`/posts/react/${postID}`)
    .then((r) => {
      let updatedPosts = [...getState().post.posts];
      updatedPosts[idx].reactions = r.data.reactions;
      updatedPosts[idx].userReaction = r.data.userReaction;
      dispatch(setPosts(updatedPosts));
    })
    .catch((e) => {
      console.log(e);
    });
};
