import React from "react";
import UserLink from "../UserLink";

function FollowLinkItem({ onClick, item, children }) {
  return (
    <div className="row">
      <UserLink
        className="list-group-item list-group-item-action col m-2"
        userID={item.user._id}
        onClick={onClick}
      >
        {item.user.nickname}
      </UserLink>
      {children}
    </div>
  );
}

export default FollowLinkItem;
