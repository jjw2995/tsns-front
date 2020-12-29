import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Modal from "react-modal";

function MyModal({ startOpen = false, buttonName, ...rest }) {
  const props = { ...rest };
  const [open, setOpen] = useState(startOpen);
  const closeModal = () => {
    setOpen(false);
  };
  const openModal = () => {
    setOpen(true);
  };
  return (
    <div>
      <Modal
        style={{
          overlay: {
            zIndex: "1000",
          },
          content: {
            top: "13%",
            bottom: "13%",
            left: "20%",
            right: "20%",
            fontFamily: "sans-serif",
          },
        }}
        isOpen={open}
        onRequestClose={closeModal}
      >
        {React.cloneElement(props.children, { closeModal })}
      </Modal>
      <Button className="btn-secondary" onClick={openModal}>
        {buttonName}
      </Button>
    </div>
  );
}

export default MyModal;
