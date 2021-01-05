import React from "react";
import Posts, { endpoints } from "../post/Posts";

function Explore() {
  return (
    <div>
      <div style={{ textAlign: "center" }}>
        <h6>get posts ordered by # of reactions (reactionCounts) & date</h6>
        If there are more posts than the pageSize with same reactionCounts,
        newest posts are fetched within same reactionCounts
      </div>
      <Posts endPoint={endpoints().EXPLORE} />
    </div>
  );
}
export default Explore;
