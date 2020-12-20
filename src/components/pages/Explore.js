import { Button } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import Posts, { endpoints } from "../PostComponent/Posts";
import BaseUrlAxios from "../../rest/AuthedAxios";
// import { Route } from "react-router";
import { Link } from "react-router-dom";
import User from "./User";

// const query = Joi.string()
//   //   .alphanum()
//   .pattern(/^[a-zA-Z0-9\_]{0,16}$/)
//   .required();
// //   Joi.string().disallow(" ").alphanum().required();

// router.post("/private", userController.postPrivate);

// router.post(
//   "/search",
//   validate(Segments.BODY, { q: query }),
//   userController.getSearch
// );

// const Suggestions = (props) => {
//   const options = props.results.map((r) => (
//     <Link
//       href={`/users/${r._id}`}
//       className="list-group-item list-group-item-action"
//       key={r._id}
//       to={{ pathname: `/explore/users/${r._id}`, user: r }}
//     >
//       {r.nickname}
//     </Link>
//   ));
//   return (
//     <div style={{ float: "right" }} className="list-group">
//       {options}
//     </div>
//   );
//   // return <div></div>;
// };

// { _id: 1, nickname: "ab" },
// { _id: 2, nickname: "cd" },
// { _id: 3, nickname: "ef" },

function UserPage(uid) {
  // useEffect(() => {
  // }, [uid]);
  return (
    <div>
      <User uid={uid} key={uid} />
    </div>
  );
}

function Explore() {
  const [results, setResults] = useState([]);
  const [expUserID, setExpUserID] = useState();
  useEffect(() => {}, [expUserID]);

  // const ExploringUserContext = React.createContext()
  return (
    <div>
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

                console.log(v);
                if (v && v.length > 0 && v.length % 2 === 0) {
                  // call api
                  // console.log(v);
                  BaseUrlAxios()
                    .get(`/users/search?query=${v}`)
                    .then((r) => {
                      console.log(r);
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
              <div style={{ float: "right" }} className="list-group">
                {results.map((r) => {
                  return (
                    <button
                      key={r._id}
                      className="list-group-item list-group-item-action"
                      onClick={() => {
                        setExpUserID(r._id);
                        setResults([]);
                        document.getElementById("searchField").value = "";
                      }}
                    >
                      {r.nickname}
                    </button>
                  );
                })}
              </div>
            )}
            {/* <Suggestions className="row" results={results} /> */}
          </div>
          <div>
            <Button type="button">Q</Button>
          </div>
        </div>
      </div>
      {/* if clicked, show user Profile */}
      {expUserID ? (
        // <User uid={expUserID} />
        UserPage(expUserID)
      ) : (
        <Posts endPoint={endpoints().EXPLORE} />
      )}
    </div>
  );
}
export default Explore;
