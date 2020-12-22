import { Dropdown } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import BaseUrlAxios from "../../rest/AuthedAxios";

function Pending() {
  const [follows, setFollows] = useState();
  // pendingFollowers: [
  //   { _id: 1, nickname: "asd" },
  //   { _id: 4, nickname: "qweq" },
  // ],
  // pendingFollowees: [
  //   { _id: 2, nickname: "asfas" },
  //   { _id: 3, nickname: "asfasds" },
  // ],
  useEffect(() => {
    BaseUrlAxios()
      .get("/follows/pending")
      .then((r) => {
        console.log(r.data);
        setFollows(r.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <div>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic" size="sm">
          pending
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {follows ? (
            <React.Fragment>
              {/* <pre>{JSON.stringify(follows, null, 2)}</pre> */}

              {follows.pendingFollowers.length > 0 ? (
                <React.Fragment>
                  <b>accept followers</b>
                  {follows.pendingFollowers.map((r) => {
                    return (
                      <Dropdown.Item
                        key={r._id}
                        onClick={() => {
                          BaseUrlAxios()
                            .post("/followers/accept", {
                              _id: r._id,
                            })
                            .then((r) => {
                              console.log(r.data);
                            })
                            .catch((e) => {
                              console.log(e);
                            });
                        }}
                      >
                        {r.nickname}
                      </Dropdown.Item>
                    );
                  })}
                </React.Fragment>
              ) : null}

              <hr className="b-0 m-0" />

              {follows.pendingFollowees.length > 0 ? (
                <React.Fragment>
                  <b>unfollow followees</b>
                  {follows.pendingFollowees.map((r) => {
                    return (
                      <Dropdown.Item key={r._id}>{r.nickname}</Dropdown.Item>
                    );
                  })}
                </React.Fragment>
              ) : null}
            </React.Fragment>
          ) : null}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

export default Pending;
