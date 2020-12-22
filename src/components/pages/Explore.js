import { Button } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import Posts, { endpoints } from "../PostComponent/Posts";
import BaseUrlAxios from "../../rest/AuthedAxios";
// import { Route } from "react-router";
import { Link } from "react-router-dom";
import UserInfo from "../userInfo/UserInfo";
import SearchUser from "../SearchUser";

function Explore() {
  const [results, setResults] = useState([]);
  const [expUserID, setExpUserID] = useState();
  useEffect(() => {}, [expUserID]);

  // const ExploringUserContext = React.createContext()
  return (
    <div>
      <SearchUser />
      {/* if clicked, show user Profile */}
      {expUserID ? (
        <UserInfo uid={expUserID} key={expUserID} />
      ) : (
        <Posts endPoint={endpoints().EXPLORE} />
      )}
    </div>
  );
}
export default Explore;
