import { Button } from "react-bootstrap";
import React, { useState } from "react";
import Modal from "react-modal";

import DismissedPendingFollowers from "./DismissedPendingFollowers";
// import { Button } from "bootstrap";

function DismissedPending() {
  const [openModal, setOpenModal] = useState(false);

  const closeModal = () => {
    setOpenModal(false);
  };

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
        <DismissedPendingFollowers />
      </Modal>
    </div>
  );
}

export default DismissedPending;
