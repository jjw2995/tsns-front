import React, { useEffect, useState } from "react";
import BaseUrlAxios from "../rest/AuthedAxios";
import UserLink from "./UserLink";

function SearchUser() {
  const [results, setResults] = useState([]);
  const [blur, setBlur] = useState(true);

  const focusSearch = () => {
    setBlur(false);
  };

  const blurSearch = () => {
    document.getElementById("searchField").blur();
    setBlur(true);
  };

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.keyCode === 27) {
        blurSearch();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, []);

  return (
    <div>
      <div className="d-flex justify-content-center mb-5 mt-1">
        <div className="list-group" style={{ position: "absolute" }}>
          <div>
            <input
              style={{ width: "12rem", zIndex: "2" }}
              type="text"
              autoComplete="off"
              placeholder="...search user"
              id="searchField"
              onFocus={focusSearch}
              onBlur={blurSearch}
              onChange={(e) => {
                let v = e.currentTarget.value;

                if (v && v.length > 0) {
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
          </div>
          {!blur && results.length > 0 && (
            <div
              style={{
                float: "left",
                width: "12rem",
              }}
              className="list-group"
            >
              {results.map((r) => {
                return (
                  <UserLink
                    key={r._id}
                    className="list-group-item list-group-item-action"
                    style={{ zIndex: "1" }}
                    userID={r._id}
                  >
                    {r.nickname}
                  </UserLink>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchUser;
