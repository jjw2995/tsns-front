import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Waypoint } from "react-waypoint";
import {
  getSetMorePosts,
  getSetInitialPosts,
  getPostEndpoints,
  pathEqlExplore,
} from "../../redux/posts/postsActions";
import Post from "./Post";

export const endpoints = (userID = null) => {
  return getPostEndpoints(userID);
};

const PAGE_SIZE = 8;
function Posts({ endPoint }) {
  console.log(endPoint);
  const posts = useSelector((state) => state.post.posts);
  const hasFetched = useSelector((state) => state.post.hasFetched);
  const hasMore = useSelector((state) => state.post.hasMore);

  const refreshToken = useSelector((state) => state.auth.refreshToken);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSetInitialPosts(endPoint, PAGE_SIZE));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchMore = () => {
    // console.log(posts[posts.length - 1].reactionsCount);
    dispatch(
      getSetMorePosts(
        endPoint,
        pathEqlExplore(endPoint)
          ? posts[posts.length - 1].reactionsCount
          : posts[posts.length - 1].createdAt,
        PAGE_SIZE
      )
    );
  };

  return (
    <div>
      {posts.length > 0 ? (
        <React.Fragment>
          {posts.map((r, i) => {
            return (
              <div key={r._id}>
                <Post post={r} idx={i} />
                {i === posts.length - 1 && (
                  <Waypoint
                    onEnter={() => {
                      // fetch more
                      fetchMore();
                    }}
                  />
                )}
              </div>
            );
          })}
          {!hasMore && (
            <div
              style={{
                textAlign: "center",
                marginTop: "2rem",
                msTextAutospace: "ideograph-alpha",
              }}
            >
              <h5 style={{ color: "grey" }}>no more posts to show</h5>
            </div>
          )}
        </React.Fragment>
      ) : (
        hasFetched && (
          <div
            style={{
              textAlign: "center",
              marginTop: "10rem",
              msTextAutospace: "ideograph-alpha",
            }}
          >
            {(endPoint === endpoints().HOME && (
              <React.Fragment>
                <h4>Upload a First Post</h4>
                by clicking <b>new Post</b> / <b>+</b> below
              </React.Fragment>
            )) ||
              (endPoint === endpoints().MINE && (
                <React.Fragment>
                  <h4>You don't seem to have any posts yet,</h4>
                  <h6>
                    upload a first post @<b>Home</b>
                  </h6>
                </React.Fragment>
              )) || (
                <React.Fragment>
                  <h4>No Trending Public Posts to Show</h4>
                  <h6>
                    upload a <b>public</b> post yourself @<b>Home</b>
                  </h6>
                </React.Fragment>
              )}
          </div>
        )
      )}
      <div style={{ marginTop: "3rem" }}></div>
    </div>
  );
}

export default Posts;
