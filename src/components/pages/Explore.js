import { Button } from "react-bootstrap";
import React from "react";
import Posts, { endpoints } from "../PostComponent/Posts";

function Explore() {
  return (
    <div>
      <div className="row justify-content-center">
        <input
          style={{ marginRight: "0.1em" }}
          type="text"
          placeholder="search user..."
        />
        <Button type="button">Q</Button>
      </div>
      <Posts endPoint={endpoints().EXPLORE} />
    </div>
  );
}
export default Explore;
