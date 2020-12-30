import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function UserLink(props) {
  const user = useSelector((state) => state.auth.user);

  return (
    <Link
      //   key={props.userID}
      className={props.className}
      style={props.style}
      to={
        user._id === props.userID ? "/mine" : `/explore/users/${props.userID}`
      }
    >
      {props.children}
    </Link>
  );
}

export default UserLink;
