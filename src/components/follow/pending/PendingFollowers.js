import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  acceptPendingFollower,
  deletePendingFollower,
  dismissPendingFollower,
  getPendingFollowers,
} from "../../../redux/follows/followsActions";
import FollowLinkItem from "../FollowLinkItem";

function PendingFollowers() {
  const pendingFollowers = useSelector(
    (state) => state.follows.pendingFollowers
  );

  const dispatch = useDispatch();

  return (
    <React.Fragment>
      {pendingFollowers.length > 0 && (
        <div>
          <h4 className="m-2">Followers Pending</h4>
          {pendingFollowers.map((r) => {
            return (
              <FollowLinkItem item={r} key={"pendingFollowers" + r._id}>
                <Button
                  className="m-2"
                  onClick={() => dispatch(acceptPendingFollower(r))}
                >
                  accept
                </Button>
                <Button
                  className="m-2"
                  onClick={() => dispatch(dismissPendingFollower(r))}
                >
                  dismiss
                </Button>
                <Button
                  className="m-2"
                  onClick={() => dispatch(deletePendingFollower(r))}
                >
                  remove
                </Button>
              </FollowLinkItem>
            );
          })}
          <Button
            className="justify-content-center"
            onClick={() => dispatch(getPendingFollowers(true))}
          >
            get more
          </Button>
        </div>
      )}
    </React.Fragment>
  );
}

export default PendingFollowers;
