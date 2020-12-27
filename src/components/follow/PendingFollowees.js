import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePendingFollowee,
  getPendingFollowees,
} from "../../redux/follows/followsActions";
import FollowLinkItem from "./FollowLinkItem";

function PendingFollowees() {
  const pendingFollowees = useSelector(
    (state) => state.follows.pendingFollowees
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPendingFollowees());
  }, []);

  return (
    <React.Fragment>
      {pendingFollowees.length > 0 && (
        <div>
          <h4 className="m-2">Followees Pending</h4>
          {pendingFollowees.map((r) => {
            return (
              <FollowLinkItem item={r} key={"pendingFollowees" + r._id}>
                <Button
                  className="m-2"
                  onClick={() => dispatch(deletePendingFollowee(r))}
                >
                  unfollow
                </Button>
              </FollowLinkItem>
            );
          })}
          <Button
            className="justify-content-center"
            onClick={() => dispatch(getPendingFollowees(true))}
          >
            get more
          </Button>
        </div>
      )}
    </React.Fragment>
  );
}

export default PendingFollowees;
