import React from "react";
import { Button } from "react-bootstrap";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div
      className="d-flex justify-content-end fixed-bottom"
      style={{ pointerEvents: "none" }}
    >
      <div
        style={{
          left: "100px",
          top: "150px",
          pointerEvents: "initial",
        }}
      >
        <Button
          variant="secondary"
          onClick={() => {
            window.scroll({ top: 0, behavior: "smooth" });
          }}
        >
          ^
        </Button>
      </div>
    </div>
  );
}

export default ScrollToTop;
