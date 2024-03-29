import React, { useEffect, useState } from "react";
import { AuthedAxios } from "../../rest/axiosTypes";
import FollowList from "./FollowList";

function FollowersFollowees({ uid, isShow }) {
  const [followCounts, setFollowCounts] = useState({
    followeesCount: 0,
    followersCount: 0,
  });

  useEffect(() => {
    AuthedAxios()
      .get(`/follows/count/${uid}`)
      .then((r) => {
        setFollowCounts((pre) => {
          return { ...pre, ...r.data };
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }, [uid]);
  return (
    <div>
      {/* <div className="row"> */}
      <FollowList
        title={`${followCounts.followersCount}  Followers`}
        isShow={isShow}
        uid={uid}
        className="m-1"
        item={"followers"}
      />
      <FollowList
        title={`${followCounts.followeesCount}  Followees`}
        isShow={isShow}
        uid={uid}
        className="m-1"
        item={"followees"}
      />
    </div>
  );
}

export default FollowersFollowees;
