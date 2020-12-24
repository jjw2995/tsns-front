import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import BaseUrlAxios from "../../rest/AuthedAxios";
import FollowersFollowees from "../follow/Follow";
import Posts, { endpoints } from "../PostComponent/Posts";

function Mine() {
  const user = useSelector((state) => state.auth.user);
  const [myInfo, setMyInfo] = useState();

  useEffect(() => {
    BaseUrlAxios()
      .get(`/users/${user._id}`)
      .then((r) => {
        console.log("get user/:uid : ", r.data);
        setMyInfo(r.data);
      })
      .catch((e) => {
        console.log(JSON.parse(JSON.stringify(e)));
      });
  }, []);

  // { isPrivate: body.isPrivate },

  return (
    <div>
      <h1>My info</h1>
      {/* <UserInfo /> */}
      {myInfo ? (
        <div>
          <div>{myInfo.nickname}</div>
          <div>{myInfo.isPrivate ? <div>private</div> : <div>public</div>}</div>
          <button
            type="button"
            onClick={() => {
              BaseUrlAxios()
                .post("users/private", {
                  isPrivate: !myInfo.isPrivate,
                })
                .then((r) => {
                  console.log("from api, setting isPrivate", r.data);
                  let newMyInfo = { ...user };
                  newMyInfo.isPrivate = r.data.isPrivate;
                  setMyInfo(newMyInfo);
                })
                .catch((e) => {
                  console.log(JSON.parse(JSON.stringify(e)));
                });
            }}
          >
            {myInfo.isPrivate ? <div>go Public</div> : <div>go Private</div>}
          </button>
          <FollowersFollowees id={user._id} isShow={true} />
        </div>
      ) : (
        <div />
      )}
      <div>{/* <Posts endPoint={endpoints().MINE} /> */}</div>
    </div>
  );
}
export default Mine;
