import React from "react";
import Posts, { endpoints } from "../PostComponent/Posts";

function Mine() {
  return (
    <div>
      <h1>Mine page</h1>
      <div>
        <Posts endPoint={endpoints().MINE} />
      </div>
    </div>
  );
}
export default Mine;
