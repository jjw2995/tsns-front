import React from "react";
import { Col, Nav, Navbar, Row, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { clearAuth } from "../redux/auth/AuthActions";
import { isSmallWindow } from "../utils";
import Pending from "./follow/pending/Pending";
import SearchUser from "./SearchUser";

function NavigationBar(props) {
  const path = props.location.pathname;
  const dispatch = useDispatch();
  let nickname;

  // nickname = useSelector((state) => state.auth.user.nickname);
  return (
    <Navbar
      expand="lg"
      bg="white"
      sticky={!isSmallWindow ? "top" : null}
      style={{ zIndex: "3" }}
      expanded={true}
    >
      <div className="col d-flex justify-content-end">
        <div>
          <h2>tSNS</h2>
          <p>
            as <b>{nickname}</b>
          </p>
        </div>
      </div>

      <Col xs={6}>
        <Row className="justify-content-center">
          <Nav className="d-flex justify-content-center">
            <Nav.Link
              className="navElem"
              // href="/#"
              href="/home"
              eventKey="/home"
              active={path === "/home" ? true : false}
            >
              Home
            </Nav.Link>

            <Nav.Link
              className="navElem"
              // href="/#"
              href="/explore"
              eventKey="explore"
              active={path.split("/")[1] === "explore" ? true : false}
            >
              Explore
            </Nav.Link>

            <Nav.Link
              className="navElem"
              // href="/#"
              href="/mine"
              eventKey="mine"
              active={path === "/mine" ? true : false}
            >
              Mine
            </Nav.Link>
          </Nav>
        </Row>
        <div style={{ height: "2.1rem" }}>
          {path.split("/")[1] === "explore" && <SearchUser />}
        </div>
      </Col>
      <div className="col">
        <div className="d-flex flex-wrap flex-column justify-content-end">
          <a href="/about" className="h3 text-dark">
            about <b>tSNS</b> & <b>ME</b>
          </a>
          <div className="d-flex flex-wrap">
            <Pending className="justify-self-end" />
            <Button
              variant="outline-dark"
              className="ml-2"
              onClick={() => {
                console.log(props);
                props.history.push("");

                dispatch(clearAuth());
              }}
            >
              logout
            </Button>
          </div>
        </div>
      </div>
    </Navbar>
  );
}

export default NavigationBar;
