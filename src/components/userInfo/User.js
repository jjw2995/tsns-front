import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import BaseUrlAxios from "../../rest/AuthedAxios";
import FollowersFollowees from "../follow/Follow";
import Posts, { endpoints } from "../PostComponent/Posts";

const logErr = (e) => {
  console.log(JSON.parse(JSON.stringify(e)));
};

function User() {
  // get posts by user id
  // user info
  const [user, setUser] = useState();

  const { uid } = useParams();
  console.log(uid);

  useEffect(() => {
    console.log("here", user);
    BaseUrlAxios()
      .get(`/users/${uid}`)
      .then((r) => {
        console.log("get user/:uid : ", r.data);
        setUser(r.data);
      })
      .catch((e) => {
        console.log(JSON.parse(JSON.stringify(e)));
      });
  }, []);

  const onReqeust = (newState) => {
    setUser(() => {
      newState.isFollowing = !newState.isFollowing;
      console.log("newState b4 setting: ", newState);
      return newState;
    });
  };

  return (
    <div>
      {user ? (
        <div className="card d-flex flex-col">
          <div>{user.nickname}</div>
          {user.isFollowing ? (
            user.isPending ? (
              <div>pending</div>
            ) : (
              <div>following</div>
            )
          ) : user.private ? (
            <div>this user is private</div>
          ) : (
            <br />
            // <div></div>
          )}
          {/* <div className="card-body">{JSON.stringify(user, null, 2)}</div> */}
          <div>
            <button
              onClick={() => {
                // console.log(user);
                let newState = { ...user };
                !user.isFollowing
                  ? BaseUrlAxios()
                      .post("/followees", { _id: uid })
                      .then((r) => {
                        console.log("follow request: ", r.data);
                        newState.isPending = r.data.isPending;
                        onReqeust(newState);
                      })
                      .catch((e) => {
                        logErr(e);
                      })
                  : BaseUrlAxios()
                      .delete(`/followees/${uid}`)
                      .then((r) => {
                        console.log("unfollow request: ", r.data);
                        newState.isPending = false;
                        onReqeust(newState);
                      })
                      .catch((e) => {
                        logErr(e);
                      });
              }}
            >
              {user.isFollowing ? <div>unfollow</div> : <div>follow</div>}
            </button>
          </div>
          <div className="container">
            <FollowersFollowees
              id={user._id}
              isShow={user.isFollowing && !user.isPending}
            />
          </div>
        </div>
      ) : (
        <div />
      )}
      <Posts endPoint={endpoints(uid).USER} />
    </div>
  );
}

export default User;
