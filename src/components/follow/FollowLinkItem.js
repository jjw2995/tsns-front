import React from "react";
import { Link } from "react-router-dom";
import UserLink from "../UserLink";

function FollowLinkItem(props) {
  let r = props.item;
  return (
    <div className="row">
      <UserLink
        className="list-group-item list-group-item-action col m-2"
        userID={r.user._id}
      >
        {r.user.nickname}
      </UserLink>
      {props.children}
    </div>
  );
}

export default FollowLinkItem;
