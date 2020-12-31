import React from "react";

function UserInfo({ user, followOrSetPriv, children }) {
  console.log(user);
  return (
    <React.Fragment>
      <div className="d-flex" style={{ justifyContent: "center" }}>
        <div
          style={{ width: "50rem", justifyContent: "center" }}
          // style={{ maxWidth: "50rem", minWidth: "50rem" }}
        >
          {user && (
            <div className="d-flex">
              <div className="mx-auto">
                <h3>{user.nickname}</h3>
                <div>{user.isPrivate ? "private user" : "public user"}</div>
              </div>
              <div className="mx-auto">{followOrSetPriv}</div>
              <div className="mx-auto">{children}</div>
            </div>
          )}
        </div>
      </div>
      <hr
        className="dashed mt-3"
        style={{
          marginLeft: "5%",
          // marginBottom: "3%",
          height: "1px",
          backgroundColor: "lightgrey",
          width: "90%",
          // borderTop: "1px dashed grey",
        }}
      />
    </React.Fragment>
  );
}

export default UserInfo;
