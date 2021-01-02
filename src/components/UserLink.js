import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function UserLink({ className, style, userID, children }) {
  const user = useSelector((state) => state.auth.user);

  return (
    <Link
      //   key={userID}
      className={className}
      style={style}
      to={user._id === userID ? "/mine" : `/explore/users/${userID}`}
    >
      {children}
    </Link>
  );
}

export default UserLink;
