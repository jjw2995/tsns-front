import React from "react";
import { Col, Nav, Navbar, Row, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { clearAuth } from "../redux/auth/AuthActions";
import Pending from "./follow/Pending";

function NavigationBar(props) {
  const path = props.location.pathname;

  const dispatch = useDispatch();

  // const onClickHandler = (path) => {
  //   props.history.push(path);
  // };

  // const [search, setSearch] = useState(null);
  // const [results, setResults] = useState([]);
  const nickname = JSON.parse(localStorage.getItem("AUTH")).user.nickname;
  // console.log(a);

  return (
    <Navbar
      expand="lg"
      bg="white"
      sticky="top"
      className="row mb-2"
      expanded={true}
      style={{ width: "100%" }}
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
              active={path === "/explore" ? true : false}
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
      </Col>

      <div className="col">
        <div className="d-flex flex-column justify-content-end">
          <a href="/about" className="h3 text-dark">
            about <b>tSNS</b> & <b>ME</b>
          </a>
          <div className="d-flex">
            <div>
              <Pending className="justify-self-end" />
              <a
                // href="/#"
                href=""
                onClick={() => {
                  dispatch(clearAuth());
                }}
                className="text-dark text-size-12"
              >
                logout
              </a>
            </div>
          </div>
        </div>
      </div>
    </Navbar>
  );
}

export default NavigationBar;
