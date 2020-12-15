import BaseUrlAxios from "../AuthedAxios";
import {
  APPEND_POSTS_END,
  APPEND_POSTS_FRONT,
  // CLEAR_POSTS,
} from "./postsTypes";
// postPost
// firstFetchPosts
// continueFetchPosts
//

export const appendPostsFront = (posts) => {
  return {
    type: APPEND_POSTS_FRONT,
    payload: posts,
  };
};

export const appendPostsEnd = (posts) => {
  return {
    type: APPEND_POSTS_END,
    payload: posts,
  };
};
export const postPost = (postFormData) => (dispatch, getState) => {
  console.log(postFormData);
  // console.log(getState().auth.accessToken);
  BaseUrlAxios(getState().auth.accessToken, true)
    .post("/posts", postFormData)
    .then((r) => {
      console.log(r);
    })
    .catch((e) => {
      console.log(e);
      console.log(e.data);
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
