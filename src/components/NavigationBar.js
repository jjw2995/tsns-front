import React from "react";
import { Col, Nav, Navbar } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { clearAuth } from "../redux/auth/AuthActions";
function NavigationBar(props) {
  const path = props.location.pathname;
  const dispatch = useDispatch();

  return (
    <Navbar
      expand="lg"
      bg="white"
      fixed="top"
      className="row"
      expanded={true}
      onClick={() => {
        console.log(path);
      }}
    >
      <h1 className="col d-flex justify-content-end">tSNS</h1>
      <Col xs={6}>
        <Nav className="d-flex justify-content-center">
          <Nav.Link
            className="navElem"
            href="/#"
            //href="/home"
            eventKey="/home"
            active={path === "/home" ? true : false}
          >
            Home
          </Nav.Link>

          <Nav.Link
            className="navElem"
            href="/#"
            // href="/explore"
            eventKey="explore"
            active={path === "/explore" ? true : false}
          >
            Explore
          </Nav.Link>

          <Nav.Link
            className="navElem"
            href="/#"
            // href="/mine"
            eventKey="mine"
            active={path === "/mine" ? true : false}
          >
            Mine
          </Nav.Link>
        </Nav>
      </Col>

      <div className="col">
        <div className="d-flex flex-column justify-content-end">
          <a href="/about" className="h3 text-dark">
            {/* <a href="/about" className="h3 text-dark"> */}
            about <b>tSNS</b> & <b>ME</b>
          </a>
          <a
            href="/#"
            // href=""
            onClick={() => {
              dispatch(clearAuth());
            }}
            className="text-dark text-size-12"
          >
            logout
          </a>
        </div>
      </div>
    </Navbar>
  );
}

export default NavigationBar;
