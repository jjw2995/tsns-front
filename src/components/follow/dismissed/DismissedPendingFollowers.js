import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  acceptDismissedPendingFollower,
  deleteDismissedPendingFollower,
  getDismissedPendingFollowers,
} from "../../../redux/follows/followsActions";
import FollowLinkItem from "../FollowLinkItem";

function DismissedPendingFollowers({ userLinkOnClick }) {
  const dismissedPendingFollowers = useSelector(
    (state) => state.follows.dismissedPendingFollowers
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDismissedPendingFollowers());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      <div>
        <h5 className="m-2">
          Pending Followers{" "}
          {dismissedPendingFollowers.length === 0 && <b>N/A</b>}
        </h5>
        {dismissedPendingFollowers.length > 0 && (
          <React.Fragment>
            {dismissedPendingFollowers.map((r) => {
              return (
                <FollowLinkItem
                  onClick={userLinkOnClick}
                  item={r}
                  key={"pendingDismissed" + r._id}
                >
                  <Button
                    className="m-2"
                    onClick={() => dispatch(acceptDismissedPendingFollower(r))}
                  >
                    accept
                  </Button>
                  <Button
                    className="m-2"
                    variant="danger"
                    onClick={() => dispatch(deleteDismissedPendingFollower(r))}
                  >
                    remove
                  </Button>
                </FollowLinkItem>
              );
            })}

            <div className="justify-content-center d-flex">
              <Button
                className="justify-content-center"
                onClick={() => dispatch(getDismissedPendingFollowers(true))}
              >
                get more
              </Button>
            </div>
          </React.Fragment>
        )}
      </div>
    </React.Fragment>
  );
}

export default DismissedPendingFollowers;
