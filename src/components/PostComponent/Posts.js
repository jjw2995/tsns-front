import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Waypoint } from "react-waypoint";
import InfScrollText from "./InfScrollText";
import Post from "./Post";

function Posts({ posts = [], fetchMore }) {
  return (
    <div
    // onScroll={handleScroll}
    // style={{
    // overflowY: "scroll",
    // , maxHeight: "400px"
    // }}
    >
      {posts.map((r, i) => {
        return (
          <div key={r._id}>
            <Post post={r} />
            {/* <Waypoint
              onEnter={() => {
                console.log(i);
              }}
            /> */}
            {i === posts.length - 1 && <h1>loading...</h1> && (
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
