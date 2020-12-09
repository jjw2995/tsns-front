import React from "react";
import { Container, Nav, Navbar, Row, Col } from "react-bootstrap";
// import { useLocation } from "react-router-dom";

function NavigationBar(props) {
  // let [actKey, setActiveKey] = useState("/home");
  // const location = useLocation();
  // props.activ

  return (
    <Navbar>
      <Nav
        className="m-auto"
        // activeKey={actKey}
        // onSelect={(selectedKey) => {
        //   console.log(location);
        //   setActiveKey(selectedKey);
        // }}
      >
        <Nav.Link
          // Link="/home"
          href="/home"
          eventKey="/home"
        >
          Home
        </Nav.Link>

        <Nav.Link
          // Link="/explore"
          href="/explore"
          eventKey="explore"
        >
          Explore
        </Nav.Link>

        <Nav.Link
          // Link="/mine"
          href="/mine"
          eventKey="mine"
        >
          Mine
        </Nav.Link>
      </Nav>
      <Nav>
        <Nav.Link
          className="ml-auto"
          // Link="/about"

          href="/about"
          eventKey="about"
        >
          About
        </Nav.Link>
      </Nav>
    </Navbar>
  );
}

export default NavigationBar;
