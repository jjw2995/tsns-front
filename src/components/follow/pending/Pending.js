import { Button } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";

import PendingFollowees from "./PendingFollowees";
import PendingFollowers from "./PendingFollowers";
import {
  // getDismissedPendingFollowers,
  // getPendingFollowees,
  getPendingFollowers,
} from "../../../redux/follows/followsActions";
import { useDispatch, useSelector } from "react-redux";
import DismissedPending from "../dismissed/DismissedPending";

function Pending() {
  const [openModal, setOpenModal] = useState(false);

  const closeModal = () => {
    setOpenModal(false);
  };
  const dispatch = useDispatch();
  const getNew = useSelector((state) => state.follows.new);

  useEffect(() => {
    dispatch(getPendingFollowers());
    // dispatch(getPendingFollowees());
    // dispatch(getDismissedPendingFollowers());
  }, []);

  return (
    <div>
      <Button
        size="lg"
        variant={getNew ? "dark" : "outline-dark"}
        onClick={() => {
          setOpenModal(true);
        }}
      >
        pending
      </Button>
      <Modal
        style={{
          overlay: {
            // zIndex: "1000",
          },
          content: {
            top: "13%",
            bottom: "13%",
            left: "25%",
            right: "25%",
            fontFamily: "sans-serif",
          },
        }}
        isOpen={openModal}
        onRequestClose={closeModal}
      >
        {/* <Button className="mb-2" onClick={closeModal}>
          x
        </Button> */}
        <Button
          variant="dark"
          style={{
            position: "absolute",
            right: "0",
            top: "0",
            zIndex: "1",
          }}
          type="button"
          size="lg"
          onClick={closeModal}
        >
          x
        </Button>
        <PendingFollowers />
        <PendingFollowees />
        <DismissedPending />
      </Modal>
    </div>
  );
}

export default Pending;
