import React from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  acceptPendingFollower,
  deletePendingFollower,
  dismissPendingFollower,
  getPendingFollowers,
} from "../../../redux/follows/followsActions";
import FollowLinkItem from "../FollowLinkItem";

function PendingFollowers({ userLinkOnClick }) {
  const pendingFollowers = useSelector(
    (state) => state.follows.pendingFollowers
  );

  const dispatch = useDispatch();

  return (
    <React.Fragment>
      <h5 className="m-2">
        Followers {pendingFollowers.length === 0 && <b>N/A</b>}
      </h5>
      {pendingFollowers.length > 0 && (
        <React.Fragment>
          {pendingFollowers.map((r) => {
            return (
              <FollowLinkItem
                onClick={userLinkOnClick}
                item={r}
                key={"pendingFollowers" + r._id}
              >
                <Button
                  className="m-2"
                  onClick={() => dispatch(acceptPendingFollower(r))}
                >
                  accept
                </Button>
                <Button
                  className="m-2"
                  variant="secondary"
                  onClick={() => dispatch(dismissPendingFollower(r))}
                >
                  dismiss
                </Button>
                <Button
                  variant="danger"
                  className="m-2"
                  onClick={() => dispatch(deletePendingFollower(r))}
                >
                  remove
                </Button>
              </FollowLinkItem>
            );
          })}
          <div className="justify-content-center d-flex">
            <Button onClick={() => dispatch(getPendingFollowers(true))}>
              get more
            </Button>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

export default PendingFollowers;
