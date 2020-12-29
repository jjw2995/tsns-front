import React from "react";
import Posts, { endpoints } from "../postComponent/Posts";
import SearchUser from "../SearchUser";

function Explore() {
  return (
    <div>
      <SearchUser />
      <Posts endPoint={endpoints().EXPLORE} />
    </div>
  );
}
export default Explore;
