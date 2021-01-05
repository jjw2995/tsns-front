import React, { useEffect } from "react";
import Modal from "react-modal";

function MyModal({ style, children, isOpen, onAfterOpen, onRequestClose }) {
  let modalStyle = {
    overlay: {
      zIndex: "1000",
    },
    content: {
      top: "13%",
      bottom: "13%",
      left: "20%",
      zIndex: "1000",

      right: "20%",
      fontFamily: "sans-serif",
    },
  };
  if (style) {
    modalStyle = style;
  }
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  return (
    <Modal
      style={modalStyle}
      isOpen={isOpen}
      onAfterOpen={onAfterOpen}
      onRequestClose={onRequestClose}
    >
      {children}
    </Modal>
  );
}

export default MyModal;
