import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import BaseUrlAxios from "../../rest/AuthedAxios";
import FollowersFollowees from "../follow/Follow";
import Posts, { endpoints } from "../postComponent/Posts";

function Mine() {
  const user = useSelector((state) => state.auth.user);
  const [myInfo, setMyInfo] = useState();

  useEffect(() => {
    BaseUrlAxios()
      .get(`/users/${user._id}`)
      .then((r) => {
        setMyInfo(r.data);
      })
      .catch((e) => {
        console.log(JSON.parse(JSON.stringify(e)));
      });
  }, [user._id]);

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
          <FollowersFollowees uid={user._id} isShow={true} />
        </div>
      ) : (
        <div />
      )}
      <div>
        <Posts endPoint={endpoints().MINE} />
      </div>
    </div>
  );
}
export default Mine;
