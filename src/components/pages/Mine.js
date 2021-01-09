import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
// import Swal from "sweetalert2";
import { deleteAccount } from "../../redux/auth/AuthActions";
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

  const dispatch = useDispatch();

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
          <Button
            variant="outline-danger"
            size="sm"
            className="m-1"
            onClick={() => {
              Swal.fire({
                icon: "warning",
                title: "Remove Account?",
                text:
                  "all information linked to your account will be deleted soon after",
                showConfirmButton: true,
                showDenyButton: true,
                confirmButtonText: "Yes",
                denyButtonText: "No",
              }).then((result) => {
                if (result.isConfirmed) {
                  dispatch(deleteAccount());
                }
              });
            }}
          >
            remove Account
          </Button>
        </UserInfo>
      )}
      <div>
        <Posts endPoint={endpoints().MINE} />
      </div>
    </React.Fragment>
  );
}
export default Mine;
