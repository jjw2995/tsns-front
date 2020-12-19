import React, { useState } from "react";
import { Col, Nav, Navbar, Row, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { clearAuth } from "../redux/auth/AuthActions";
import BaseUrlAxios from "../redux/AuthedAxios";

function NavigationBar(props) {
  const path = props.location.pathname;
  // console.log(path);
  const dispatch = useDispatch();
  // console.log(path.split("/")[1]);

  // const onClickHandler = (path) => {
  //   props.history.push(path);
  // };

  // const [search, setSearch] = useState(null);
  // const [results, setResults] = useState([]);

  return (
    <Navbar
      expand="lg"
      bg="white"
      sticky="top"
      className="row mb-2"
      expanded={true}
      style={{ width: "100%" }}
    >
      <h1 className="col d-flex justify-content-end">tSNS</h1>

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
              // onClick={(e) => {
              //   console.log(e.target);
              // }}
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

        {/* {path === "/explore" && (
          <Row className="justify-content-center">
            <input
              className="rounded mx-1"
              type="text"
              placeholder="search user..."
              onChange={(e) => {
                let v = e.currentTarget.value;
                if (v && v.length > 1 && v.length % 2 == 0) {
                  // call api
                  BaseUrlAxios()
                    .post()
                    .then((r) => {
                      console.log(r.data);
                      setResults(r.data);
                    })
                    .catch((e) => {
                      console.log(e.response);
                    });
                }
              }}
            />
            <Button type="button" onClick={() => {}}>
              Q
            </Button>
          </Row>
        )} */}
      </Col>

      <div className="col">
        <div className="d-flex flex-column justify-content-end">
          <a href="/about" className="h3 text-dark">
            {/* <a href="/about" className="h3 text-dark"> */}
            about <b>tSNS</b> & <b>ME</b>
          </a>
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
    </Navbar>
  );
}

export default NavigationBar;
