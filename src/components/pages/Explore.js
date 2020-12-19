import { Button } from "react-bootstrap";
import React, { useState } from "react";
import Posts, { endpoints } from "../PostComponent/Posts";
import BaseUrlAxios from "../../redux/AuthedAxios";
import { Route } from "react-router";
import { Link } from "react-router-dom";

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

const Suggestions = (props) => {
  const options = props.results.map((r) => (
    <Link
      href={`/users/${r._id}`}
      className="list-group-item list-group-item-action"
      key={r._id}
      to={{ pathname: `/explore/users/${r._id}`, user: r }}
    >
      {r.nickname}
    </Link>
  ));
  return (
    <div style={{ float: "right" }} className="list-group">
      {options}
    </div>
  );
  // return <div></div>;
};

function Explore() {
  const [results, setResults] = useState([
    // { _id: 1, nickname: "ab" },
    // { _id: 2, nickname: "cd" },
    // { _id: 3, nickname: "ef" },
  ]);

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
              onChange={(e) => {
                let v = e.currentTarget.value;
                console.log(v);
                if (v && v.length > 0 && v.length % 2 == 0) {
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
            <Suggestions className="row" results={results} />
          </div>
          <div>
            <Button type="button">Q</Button>
          </div>
        </div>
      </div>

      <Posts endPoint={endpoints().EXPLORE} />
    </div>
  );
}
export default Explore;
