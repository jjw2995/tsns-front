import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Waypoint } from "react-waypoint";
import InfScrollText from "./InfScrollText";
import Post from "./Post";

function Posts({ posts = [], fetchMore }) {
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
