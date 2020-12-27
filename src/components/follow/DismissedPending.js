import { Button } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";

import DismissedPendingFollowers from "./DismissedPendingFollowers";
import { getDismissedPendingFollowers } from "../../redux/follows/followsActions";
import { useDispatch } from "react-redux";
// import { Button } from "bootstrap";

function DismissedPending() {
  const [openModal, setOpenModal] = useState(false);

  const closeModal = () => {
    setOpenModal(false);
  };
  const dispatch = useDispatch();

  return (
    <div>
      <Button
        size="sm"
        className="mt-2"
        onClick={() => {
          setOpenModal(true);
        }}
      >
        dismissed pending
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
        // onAfterOpen={getData}
        onRequestClose={closeModal}
      >
        <Button className="mb-2" onClick={closeModal}>
          x
        </Button>
        <DismissedPendingFollowers />
      </Modal>
    </div>
  );
}

export default DismissedPending;
