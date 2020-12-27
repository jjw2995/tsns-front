import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  acceptDismissedPendingFollower,
  deleteDismissedPendingFollower,
  getDismissedPendingFollowers,
} from "../../redux/follows/followsActions";
import FollowLinkItem from "./FollowLinkItem";

function DismissedPendingFollowers() {
  const dismissedPendingFollowers = useSelector(
    (state) => state.follows.dismissedPendingFollowers
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDismissedPendingFollowers());
  }, []);

  return (
    <React.Fragment>
      {dismissedPendingFollowers.length > 0 && (
        <div>
          <h4 className="m-2">Dismissed Followers</h4>
          {dismissedPendingFollowers.map((r) => {
            return (
              <FollowLinkItem item={r} key={"pendingDismissed" + r._id}>
                <Button
                  className="m-2"
                  onClick={() => dispatch(acceptDismissedPendingFollower(r))}
                >
                  accept
                </Button>
                <Button
                  className="m-2"
                  onClick={() => dispatch(deleteDismissedPendingFollower(r))}
                >
                  remove
                </Button>
              </FollowLinkItem>
            );
          })}
          <Button
            className="justify-content-center"
            onClick={() => dispatch(getDismissedPendingFollowers(true))}
          >
            get more
          </Button>
        </div>
      )}
    </React.Fragment>
  );
}

export default DismissedPendingFollowers;
