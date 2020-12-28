import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Waypoint } from "react-waypoint";
import {
  clearPost,
  getPost,
  getPostEndpoints,
} from "../../redux/posts/postsActions";
import Post from "./Post";

export const endpoints = (userID = null) => {
  return getPostEndpoints(userID);
};

function Posts({ endPoint }) {
  const posts = useSelector((state) => state.post.posts);
  const [renderMKP, setRenderMKP] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearPost());
    dispatch(getPost(endPoint));
    setTimeout(() => {
      setRenderMKP(true);
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchMore = () => {
    dispatch(getPost(endPoint, posts[posts.length - 1].createdAt));
  };

  return (
    <div>
      {posts.length > 0
        ? posts.map((r, i) => {
            return (
              <div key={r._id}>
                {i === posts.length - 1 && (
                  <Waypoint
                    onEnter={() => {
                      // fetch more
                      fetchMore();
                    }}
                  />
                )}
                <Post post={r} />
              </div>
            );
          })
        : renderMKP && (
            <div className="d-flex justify-content-center mt-5">
              {(endPoint === endpoints().HOME && <h4>Post a First Post</h4>) ||
                (endPoint === endpoints().MINE && (
                  <h4>
                    You don't seem to have any posts yet, post a first post @
                    <b>Home</b>
                  </h4>
                )) || <h4>no posts to show</h4>}
            </div>
          )}
      <div style={{ marginTop: "3rem" }}></div>
    </div>
  );
}

export default Posts;
