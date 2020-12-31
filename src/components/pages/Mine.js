import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import BaseUrlAxios from "../../rest/AuthedAxios";
import FollowersFollowees from "../follow/FollowersFollowees";
import Posts, { endpoints } from "../postComponent/Posts";
import UserInfo from "../UserInfo";

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
    <React.Fragment>
      {myInfo && (
        <UserInfo
          user={myInfo}
          followOrSetPriv={
            <Button
              type="button"
              variant="outline-dark"
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
            </Button>
          }
        >
          <FollowersFollowees uid={user._id} isShow={true} />
        </UserInfo>
      )}
      <div>
        <Posts endPoint={endpoints().MINE} />
      </div>
    </React.Fragment>
  );
}
export default Mine;
