import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import BaseUrlAxios from "../../rest/AuthedAxios";
import FollowersFollowees from "../follow/FollowersFollowees";
import Posts, { endpoints } from "../post/Posts";
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
      <div style={{ textAlign: "center" }}>
        <h6>see user info and get all user's posts ordered by date</h6>
        <br />
      </div>
      {myInfo && (
        <UserInfo
          user={myInfo}
          followOrSetPriv={
            <Button
              type="button"
              variant="outline-dark"
              size="sm"
              // style={{ padding: "0.2rem", marginTop: "0.5rem" }}
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
          <button>d</button>
        </UserInfo>
      )}
      <div>
        <Posts endPoint={endpoints().MINE} />
      </div>
    </React.Fragment>
  );
}
export default Mine;
