import React from "react";
import { Col, Nav, Navbar, Row, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clearAuth } from "../redux/auth/AuthActions";
import { isSmallWindow } from "../utils";
import Pending from "./follow/pending/Pending";
import SearchUser from "./SearchUser";

function NavigationBar(props) {
  const path = props.location.pathname;
  const dispatch = useDispatch();

  const nickname = useSelector((state) => state.auth.user.nickname || "");

  const activeRetColor = (target) => {
    return path.split("/")[1] === target.split("/")[1] ? "black" : "grey";
  };
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
            <Link
              className="navElem"
              style={{
                textDecoration: "none",
                color: activeRetColor("/home"),
              }}
              to="/home"
            >
              Home
            </Link>

            <Link
              className="navElem"
              style={{
                textDecoration: "none",
                color: activeRetColor("/explore"),
              }}
              to="/explore"
            >
              Explore
            </Link>

            <Link
              className="navElem"
              style={{
                textDecoration: "none",
                color: activeRetColor("/mine"),
              }}
              to="/mine"
            >
              Mine
            </Link>
          </Nav>
        </Row>
        <div style={{ height: "2.1rem" }}>
          {path.split("/")[1] === "explore" && <SearchUser />}
        </div>
      </Col>
      <div className="col">
        <div className="d-flex flex-wrap flex-column justify-content-end">
          <Link style={{ textDecorationColor: "black" }} to="/about">
            <h3 className="text-dark">
              about <b>tSNS</b> & <b>ME</b>
            </h3>
          </Link>
          <div className="d-flex flex-wrap">
            <Pending className="justify-self-end" />
            <Link
              className="btn btn-outline-dark ml-2"
              to=""
              onClick={() => {
                dispatch(clearAuth());
              }}
            >
              logout
            </Link>
          </div>
        </div>
      </div>
    </Navbar>
  );
}

export default NavigationBar;
