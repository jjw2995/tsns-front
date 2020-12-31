import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Modal from "react-modal";

function MyModal({ startOpen = false, buttonName, PassedButton, ...rest }) {
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
        <Button
          variant="dark"
          style={{
            position: "absolute",
            right: "0",
            top: "0",
            zIndex: "1",
          }}
          type="button"
          onClick={closeModal}
        >
          x
        </Button>
      </Modal>
      <Button className="btn-secondary" onClick={openModal}>
        {buttonName}
      </Button>
    </div>
  );
}

export default MyModal;
