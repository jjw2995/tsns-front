import React from "react";
import { Link } from "react-router-dom";

function FollowLinkItem(props) {
  let r = props.item;
  return (
    <div className="row">
      <Link
        className="list-group-item list-group-item-action col m-2"
        to={`/explore/users/${r.user._id}`}
      >
        {r.user.nickname}
      </Link>
      {props.children}
    </div>
    // </div>
  );
}

export default FollowLinkItem;
