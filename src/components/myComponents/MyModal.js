import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Modal from "react-modal";

function MyModal({
  component: Component,
  startOpen = false,
  name: Name,
  ...rest
}) {
  const [open, setOpen] = useState(startOpen);
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
        onRequestClose={() => {
          setOpen(false);
        }}
      >
        <Component {...rest} />
      </Modal>
      <Button
        className="btn-secondary"
        onClick={() => {
          setOpen(true);
        }}
      >
        {Name}
      </Button>
    </div>
  );
}

export default MyModal;
