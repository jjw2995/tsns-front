import { Button } from "react-bootstrap";
import React, { useEffect, useState } from "react";

import PendingFollowees from "./PendingFollowees";
import PendingFollowers from "./PendingFollowers";
import { getPendingFollowers } from "../../../redux/follows/followsActions";
import { useDispatch, useSelector } from "react-redux";
import CloseButton from "../../myComponents/CloseButton";
import MyModal from "../../myComponents/MyModal";
import DismissedPendingFollowers from "../dismissed/DismissedPendingFollowers";

function Pending() {
  const [openModal, setOpenModal] = useState(false);
  const [isPendingOpen, setIsPendingOpen] = useState(true);

  const closeModal = () => {
    setIsPendingOpen(true);
    setOpenModal(false);
  };
  const dispatch = useDispatch();
  const getNew = useSelector((state) => state.follows.new);

  useEffect(() => {
    dispatch(getPendingFollowers());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Button
        // size="sm"
        variant="outline-dark"
        active={getNew ? true : false}
        onClick={() => {
          dispatch(getPendingFollowers());

          setOpenModal(true);
        }}
      >
        pending
      </Button>
      <MyModal isOpen={openModal} onRequestClose={closeModal}>
        <CloseButton onCloseHandler={closeModal} />
        <Button
          variant="outline-dark"
          className="mb-1"
          onClick={() => setIsPendingOpen(!isPendingOpen)}
        >
          {!isPendingOpen ? "View Pending" : "View Dismissed"}
        </Button>
        <h3 className="my-3">
          <b>{isPendingOpen ? "Pending" : "Dismissed"}</b>
        </h3>
        {isPendingOpen ? (
          <React.Fragment>
            <PendingFollowers userLinkOnClick={closeModal} />
            <PendingFollowees userLinkOnClick={closeModal} />
          </React.Fragment>
        ) : (
          <DismissedPendingFollowers userLinkOnClick={closeModal} />
        )}
      </MyModal>
    </div>
  );
}

export default Pending;
