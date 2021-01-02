import React from "react";
import { Button } from "react-bootstrap";

function CloseButton({ onCloseHandler }) {
  return (
    <Button
      variant="dark"
      style={{
        position: "absolute",
        right: "0",
        top: "0",
        zIndex: "1",
      }}
      type="button"
      onClick={onCloseHandler}
    >
      x
    </Button>
  );
}

export default CloseButton;
