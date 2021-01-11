import { AuthedAxios } from "../../rest/axiosTypes";
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
  AuthedAxios(true)
    .post("/posts", postFormData)
    .then((r) => {
      dispatch(addNewPost(r.data));
    })
    .catch((e) => {
      console.log(e);
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
  if (pageSize) {
    path += `?num=${pageSize}`;
  }
  AuthedAxios()
    .get(path)
    .then((r) => {
      dispatch(getInitialPosts(r.data));
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

  AuthedAxios()
    .get(path)
    .then((r) => {
      dispatch(
        getMorePosts(filterExistingContents(getState().post.posts, r.data))
      );
    })
    .catch((e) => {
      console.log(e.response);
    });
};

export const deletePost = (postID) => (dispatch, getState) => {
  AuthedAxios()
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
  AuthedAxios()
    .post("/posts/react", { postID: postID, reaction: reaction })
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

export const deletePostReaction = (postID, idx) => (dispatch, getState) => {
  AuthedAxios()
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
