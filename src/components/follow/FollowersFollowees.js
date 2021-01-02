import React, { useEffect, useState } from "react";
import BaseUrlAxios from "../../rest/AuthedAxios";
import FollowList from "./FollowList";

function FollowersFollowees({ uid, isShow }) {
  const [followCounts, setFollowCounts] = useState({
    followeesCount: 0,
    followersCount: 0,
  });

  useEffect(() => {
    BaseUrlAxios()
      .get(`/follows/count/${uid}`)
      .then((r) => {
        setFollowCounts((pre) => {
          return { ...pre, ...r.data };
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
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
