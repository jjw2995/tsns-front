import BaseUrlAxios from "../../rest/AuthedAxios";
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

export const postPost = (postFormData) => (dispatch, getState) => {
  BaseUrlAxios(true)
    .post("/posts", postFormData)
    .then((r) => {
      dispatch(appendPostFront(r.data));
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

export const getPost = (path, lastCreated = null) => (dispatch, getState) => {
  if (lastCreated) {
    path += `?last-created-at=${lastCreated}`;
  }
  BaseUrlAxios()
    .get(path)
    .then((r) => {
      if (r.data.length > 0) {
        dispatch(
          appendPostsEnd(filterExistingContents(getState().post.posts, r.data))
        );
      }
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

// router.delete(
//   "/react/:postID",
//   validate(Segments.PARAMS, { postID }),
//   postController.deleteReact
// );
