import React, { useEffect, useState } from "react";
import BaseUrlAxios from "../../rest/AuthedAxios";
import FolloweesList from "./FolloweesList";
import FollowersList from "./FollowersList";

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
    <div className="row">
      <FollowersList
        title={`${followCounts.followersCount} - Followers`}
        isShow={isShow}
        uid={uid}
      />
      <FolloweesList
        title={`${followCounts.followeesCount} - Followees`}
        isShow={isShow}
        uid={uid}
      />
    </div>
  );
}

export default FollowersFollowees;
