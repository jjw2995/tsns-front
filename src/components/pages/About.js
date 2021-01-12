import React from "react";
import reduxLogo from "../../static/logo-redux.png";
import reactLogo from "../../static/logo-react.png";
import exampleImg from "../../static/img-example.jpg";

const ContainDiv = ({ title, children, anchorName, anchorLink }) => {
  return (
    <div
      style={{
        fontSize: "1.4rem",
        textAlign: "center",
        paddingBottom: "6rem",
      }}
      className="d-flex flex-column justify-content-center"
    >
      <div className="mb-3">
        <h1>
          <b>{title}</b>
        </h1>
        {anchorName && (
          <a target="blank" rel="noopener noreferrer" href={anchorLink}>
            {anchorName}
          </a>
        )}
      </div>
      {children}
    </div>
  );
};

const FeatureDesc = ({ title, subtitle, children }) => {
  return (
    <div style={{ margin: "4rem" }}>
      <h4>
        <b>{title}</b>
        {/* <li>{title}</li> */}
      </h4>
      <h6 style={{ color: "grey" }}>{subtitle}</h6>
      <br />
      {children}
    </div>
  );
};

const TwoBr = () => {
  return (
    <React.Fragment>
      <br />
      <br />
    </React.Fragment>
  );
};

function About() {
  const logoStyle = {
    justifyContent: "center",
    paddingLeft: "1.5rem",
    paddingRight: "1.5rem",
    alignItems: "center",
    margin: "1rem",
  };
  // const textStyle = { maxWidth: "70rem", margin: "0 auto", paddingTop: "2rem" };
  const textStyle = {
    maxWidth: "70rem",
    margin: "auto",
    paddingTop: "2rem",
  };
  return (
    <React.Fragment>
      <ContainDiv
        title="Who Am I?"
        anchorLink="https://www.linkedin.com/in/jiwoo-jeon-4148861b7/"
        anchorName="LinkedIn"
      >
        <div>
          <p style={textStyle}>
            UBC grad with B.Sc. in Computer Science and Minor in Statistics,{" "}
            <br />
            I'm a potential candadite for your next hire
          </p>
        </div>
      </ContainDiv>
      <ContainDiv title="What is this?">
        <div>
          <p style={textStyle}>
            Not having built anything substantial in my university years,
            <br />I was having imposter syndrome and afraid to apply.
            <TwoBr />
            I wanted to build something real that is actually deployed to prove
            myself wrong.
            <TwoBr />
            <b>tSNS</b> (tiny SNS) project is a result of that with simple
            ReactJS frontend and NodeJS backend.
          </p>
        </div>
      </ContainDiv>
      <ContainDiv title="Its features?">
        <div style={textStyle}>
          Basically a watered down "instagram" where users can also make{" "}
          <b>Private</b> and <b>Public</b> posts.
          <FeatureDesc
            title="3 levels to a post"
            subtitle="private, followers, public"
          >
            <b>public posts</b> are viewable to all people and featured on{" "}
            <b>Explore</b>
            <br />
            <b>followers posts</b> are viewable to followers and viewable @
            <b>Home</b> OR via user search @<b>Explore</b>
            <br />
            <b>private posts</b> are viewable only to the user @<b>Home</b> OR @
            <b>Mine</b>
          </FeatureDesc>
          <FeatureDesc title="2 types of users" subtitle="private, public">
            following...
            <br />
            <b>public user</b> requires no approval of the followee <br />
            <b>private user</b> requires approval of the followee
            <TwoBr />
            follow other users by - clicking "follow" on user's profile...
            <br />
            get to user's profile by clicking on <b>nickname</b> OR search user
            @<b>Explore</b>
          </FeatureDesc>
          {/* <FeatureDesc title="follow other users by">
            clicking "follow" on user's profile...
            <br />
            get to user's profile by clicking on nickname OR search user @
            <b>Explore</b>
          </FeatureDesc> */}
        </div>
        <div>
          <h4>
            private and public users with different levels of posts are created
            for you to see how the app behaves
          </h4>
          (there are also posts with images)
        </div>
        <br />
        <div
          className="d-flex justify-content-center"
          //  style={{ alignItems: "center", display: "flex" }}
        >
          <img
            src={exampleImg}
            width="90%"
            style={{ maxWidth: "80rem" }}
            alt=""
          />
        </div>
        <div className="mt-5">
          If you don't want to register, you can try out with this account{" "}
          <br /> <br />
          <b>email</b> <br />
          personalprojectonly@gmail.com <br />
          <b>password</b> <br />
          Qwer!234
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
                height="60"
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
          First time ever touching React and Redux.
          <br />
          Redux probably wasn't necessary, but I wanted to experience it
        </p>
      </ContainDiv>
      <ContainDiv title="Other">
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
