import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePendingFollowee,
  getPendingFollowees,
} from "../../../redux/follows/followsActions";
import FollowLinkItem from "../FollowLinkItem";

function PendingFollowees({ userLinkOnClick }) {
  const pendingFollowees = useSelector(
    (state) => state.follows.pendingFollowees
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPendingFollowees());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      <div>
        <h5 className="m-2">
          Followees {pendingFollowees.length === 0 && <b>N/A</b>}
        </h5>
        {/* {pendingFollowees.length > 0 && ( */}
        {pendingFollowees.length > 0 && (
          <React.Fragment>
            {pendingFollowees.map((r) => {
              return (
                <FollowLinkItem
                  onClick={userLinkOnClick}
                  item={r}
                  key={"pendingFollowees" + r._id}
                >
                  <Button
                    variant="dark"
                    className="m-2"
                    onClick={() => dispatch(deletePendingFollowee(r))}
                  >
                    unfollow
                  </Button>
                </FollowLinkItem>
              );
            })}

            <div className="justify-content-center d-flex">
              <Button onClick={() => dispatch(getPendingFollowees(true))}>
                get more
              </Button>
            </div>
          </React.Fragment>
        )}
      </div>
    </React.Fragment>
  );
}

export default PendingFollowees;
