import React, { useState } from "react";
import BaseUrlAxios from "../rest/AuthedAxios";
import UserLink from "./UserLink";

function SearchUser() {
  const [results, setResults] = useState([]);
  return (
    <div>
      <div className="row justify-content-center">
        <div className="list-group">
          <input
            style={{ marginRight: "0.1em" }}
            type="text"
            className="row"
            placeholder="...search user"
            id="searchField"
            onChange={(e) => {
              let v = e.currentTarget.value;

              if (v && v.length > 0 && v.length % 2 === 0) {
                BaseUrlAxios()
                  .get(`/users/search?query=${v}`)
                  .then((r) => {
                    setResults(r.data);
                  })
                  .catch((e) => {
                    console.log(e.response);
                  });
              }
              if (v.length === 0) setResults([]);
            }}
          />
          {results.length > 0 && (
            <div style={{ float: "left" }} className="list-group">
              {results.map((r) => {
                return (
                  <UserLink
                    key={r._id}
                    className="list-group-item list-group-item-action"
                    userID={r._id}
                  >
                    {r.nickname}
                  </UserLink>
                );
              })}
            </div>
          )}
          {/* <Suggestions className="row" results={results} /> */}
        </div>
        {/* <div> */}
        {/* <Button type="button">Q</Button> */}
        {/* </div> */}
      </div>
    </div>
  );
}

export default SearchUser;
