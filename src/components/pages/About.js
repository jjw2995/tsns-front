import React from "react";
import reduxLogo from "../../static/logo-redux.png";
import reactLogo from "../../static/logo-react.png";

const HeaderWithAnchor = ({ title, anchorName, link }) => {
  return (
    <React.Fragment>
      <h1 className="p-0 m-0">{title}</h1>
      <div>
        <div className="">
          <a href={link}>{anchorName}</a>
        </div>
      </div>
    </React.Fragment>
  );
};

const ContainDiv = ({ title, children, anchorName, anchorLink }) => {
  const containerStyle = {
    margin: "2rem",
    width: "18rem",
    height: "20rem",
  };
  return (
    <div
      style={{
        fontSize: "1.4rem",
        textAlign: "center",
        paddingBottom: "6rem",
      }}
      className="d-flex flex-column justify-content-center"
    >
      <div className="pb-3">
        <h1>{title}</h1>
        {anchorName && <a href={anchorLink}>{anchorName}</a>}
      </div>
      {children}
    </div>
  );
};

function About() {
  const containerStyle = {
    margin: "2rem",
    width: "18rem",
    height: "20rem",
  };

  const logoStyle = {
    justifyContent: "center",
    paddingLeft: "1.5rem",
    paddingRight: "1.5rem",
    alignItems: "center",
    margin: "1rem",
  };
  const containerDiv = "py-5";
  const textStyle = { maxWidth: "70rem", margin: "0 auto" };
  return (
    <React.Fragment>
      <ContainDiv
        title="Who Am I?"
        anchorLink="https://www.linkedin.com/in/jiwoo-jeon-4148861b7/"
        anchorName="LinkedIn"
      >
        <div>
          <p style={textStyle}>
            UBC grad with B.Sc. Major in Computer Science and Minor in
            Statistics, <br />
            I'm a potential candadite for your next hire
          </p>
        </div>
      </ContainDiv>

      <ContainDiv title="What is this?">
        <div>
          <p style={textStyle}>
            Not having built anything substantial in my university years, I was
            having imposter syndrome and afraid to apply.
            <br />I wanted to build something real that is actually deployed to
            prove myself wrong.
            <br />
            <br />
            <b>tSNS</b> (tiny SNS) project is a result of that with simple
            ReactJS frontend and NodeJS backend.
          </p>
        </div>
      </ContainDiv>

      <ContainDiv
        title="Backend"
        anchorLink="https://github.com/jjw2995/tsns"
        anchorName="code"
      >
        <div>
          <div className="d-flex flex-wrap justify-content-center">
            <div style={logoStyle}>
              <div>
                <div className="mr-4 mb-2">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Node.js_logo_2015.svg/1200px-Node.js_logo_2015.svg.png"
                    alt=""
                    height="40"
                  />
                </div>
                <div className="ml-4">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/6/64/Expressjs.png"
                    height="45"
                    alt=""
                  />
                </div>
              </div>
            </div>

            <div style={logoStyle}>
              <img
                src="https://webassets.mongodb.com/_com_assets/cms/MongoDB_Logo_FullColorBlack_RGB-4td3yuxzjs.png"
                // width="250"
                height="70"
                alt=""
              />
            </div>
            <div style={logoStyle}>
              <img
                src="https://developers.gigya.com/download/attachments/45809882/1200px-Google-Cloud-Storage-Logo.png?version=1&modificationDate=1574102537000&api=v2"
                height="60"
                alt=""
              />
              <h5>Google Cloud Storage</h5>
            </div>
          </div>
          <p style={textStyle}>
            ExpressJS is used on NodeJS server.
            <br />
            MongoDB is used with Mongoose ODM and deployed on MongoDB Atlas.
            <br />
            Google Cloud Storage is used for dynamic images.
          </p>
        </div>
      </ContainDiv>

      <ContainDiv
        title="Frontend"
        anchorLink="https://github.com/jjw2995/tsns-front"
        anchorName="code"
      >
        {/* <HeaderWithAnchor title="Frontend" link="" anchorName="code" /> */}

        <div className="d-flex flex-wrap justify-content-center">
          <div style={logoStyle}>
            <img src={reactLogo} height="75" alt="" />
            <h5 className="mt-1">React</h5>
          </div>

          <div style={logoStyle}>
            <img src={reduxLogo} height="75" alt="" />
            <h5 className="mt-1">Redux</h5>
          </div>
        </div>
        <p style={textStyle}>
          probably could have done away with redux, but I wanted to see what it
          was about
        </p>
      </ContainDiv>

      <ContainDiv title="other">
        <div className="d-flex flex-wrap justify-content-center">
          <div style={logoStyle}>
            <img
              src="https://cdn.iconscout.com/icon/free/png-512/heroku-8-1175211.png"
              height="75"
              alt=""
            />
            <h5 className="mt-1">Heroku</h5>
          </div>
        </div>
        <p style={textStyle}>
          Both frontend and backend are deployed on Heroku's free dyno and
          connected to each other.
        </p>
      </ContainDiv>
    </React.Fragment>
  );
}

export default About;
