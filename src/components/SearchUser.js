import React, { useEffect, useState } from "react";
import BaseUrlAxios from "../rest/AuthedAxios";
import { Link } from "react-router-dom";

function SearchUser() {
  const [results, setResults] = useState([]);
  const [expUserID, setExpUserID] = useState();
  useEffect(() => {}, [expUserID]);
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
                  <Link
                    key={r._id}
                    className="list-group-item list-group-item-action"
                    onClick={() => {
                      setExpUserID(r._id);
                      setResults([]);
                      document.getElementById("searchField").value = "";
                    }}
                    to={`/explore/users/${r._id}`}
                  >
                    {r.nickname}
                  </Link>
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
