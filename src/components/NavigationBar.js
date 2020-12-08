import React from "react";
import { Nav, Navbar } from "react-bootstrap";
// import { useLocation } from "react-router-dom";

function NavigationBar(props) {
  // let [actKey, setActiveKey] = useState("/home");
  // const location = useLocation();
  return (
    <div>
      {/* <h1>{props.activ}</h1> */}
      <Navbar>
        <Nav
        // activeKey={actKey}
        // onSelect={(selectedKey) => {
        //   console.log(location);
        //   setActiveKey(selectedKey);
        // }}
        >
          <Nav.Item>
            <Nav.Link
              // Link="/home"
              href="/home"
              eventKey="/home"
            >
              Home
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              // Link="/explore"
              href="/explore"
              eventKey="explore"
            >
              Explore
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              // Link="/mine"
              href="/mine"
              eventKey="mine"
            >
              Mine
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              class="ml-auto"
              // Link="/about"

              href="/about"
              eventKey="about"
            >
              About
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Navbar>
    </div>
  );
}

export default NavigationBar;
