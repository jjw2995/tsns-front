import { Modal } from "react-modal";
import React, { useEffect, useState } from "react";
import BaseUrlAxios from "../../rest/AuthedAxios";
import MyModal from "../myComponents/MyModal";

function FollowersFollowees({ id, isShow }) {
  const [follows, setFollows] = useState();
  const [modalIsOpen, setModalIsOpen] = useState();

  // let followers = "/followers";
  // let followees = "/followees";

  useEffect(() => {
    BaseUrlAxios()
      .get("/follows")
      .then((r) => {
        console.log(r.data);
        setFollows(r.data);
      })
      .catch((e) => {
        console.log("???????????????????????");
        console.log(e);
      });
  }, []);
  return (
    <div className="container">
      <div>{id}</div>
      <MyModal buttonName="something">
        <div>hi</div>
      </MyModal>

      <h4>followings followers list</h4>

      {follows ? (
        <div className="d-flex row">
          <div className="col">
            followers
            {follows.followers &&
              follows.followers.length > 0 &&
              follows.followers.map((r) => {
                return <div key={r._id}>{r.nickname}</div>;
              })}
          </div>
          <div className="col">
            followees
            {follows.followees &&
              follows.followees.length > 0 &&
              follows.followees.map((r) => {
                return <div key={r._id}>{r.nickname}</div>;
              })}
          </div>
        </div>
      ) : (
        <div></div>
      )}

      {/* <div>{isShow ? <div>true</div> : <div>false</div>}</div> */}
    </div>
  );
}

export default FollowersFollowees;
