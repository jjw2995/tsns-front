import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Waypoint } from "react-waypoint";
import { getPost, getPostEndpoints } from "../../redux/posts/postsActions";
import Post from "./Post";

export const endpoints = (userID = null) => {
  return getPostEndpoints(userID);
};

function Posts({ endPoint }) {
  const posts = useSelector((state) => state.post.posts);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPost(endPoint));
  }, []);

  const fetchMore = () => {
    dispatch(getPost(endPoint, posts[posts.length - 1].createdAt));
  };

  return (
    <div>
      {posts.map((r, i) => {
        return (
          <div key={r._id}>
            <Post post={r} />
            {i === posts.length - 1 && (
              <Waypoint
                onEnter={() => {
                  // fetch more
                  fetchMore();
                  console.log(i);
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Posts;
