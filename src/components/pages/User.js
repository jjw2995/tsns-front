import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import BaseUrlAxios from "../../rest/AuthedAxios";
import FollowersFollowees from "../follow/Follow";
import Posts, { endpoints } from "../postComponent/Posts";

const logErr = (e) => {
  console.log(JSON.parse(JSON.stringify(e)));
};

function User() {
  // get posts by user id
  // user info
  const [user, setUser] = useState();
  const { uid } = useParams();

  useEffect(() => {
    BaseUrlAxios()
      .get(`/users/${uid}`)
      .then((r) => {
        setUser(r.data);
      })
      .catch((e) => {
        logErr(e);
      });
  }, [uid]);

  const onReqeust = (newState) => {
    setUser(() => {
      newState.isFollowing = !newState.isFollowing;
      return newState;
    });
  };

  const onClickRequest = () => {
    let newState = { ...user };
    !user.isFollowing
      ? BaseUrlAxios()
          .post("/followees", { _id: uid })
          .then((r) => {
            newState.isPending = r.data.isPending;
            onReqeust(newState);
          })
          .catch((e) => {
            logErr(e);
          })
      : BaseUrlAxios()
          .delete(`/followees/${uid}`)
          .then((r) => {
            newState.isPending = false;
            onReqeust(newState);
          })
          .catch((e) => {
            logErr(e);
          });
  };

  return (
    <div className="justify-content-center">
      {user && (
        <div className="card">
          <h4 className="card-title">{user.nickname}</h4>

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
          )}

          <div>
            <button onClick={onClickRequest}>
              {user.isFollowing ? <div>unfollow</div> : <div>follow</div>}
            </button>
          </div>
          <FollowersFollowees
            uid={user._id}
            isShow={user.isFollowing && !user.isPending}
          />
        </div>
      )}
      <Posts endPoint={endpoints(uid).USER} />
    </div>
  );
}

export default User;
