import React from "react";
import Posts, { endpoints } from "../PostComponent/Posts";

function Explore() {
  let a;
  return (
    <div>
      <h1>Explore page</h1>
      <Posts endPoint={endpoints().EXPLORE} />
    </div>
  );
}
export default Explore;
