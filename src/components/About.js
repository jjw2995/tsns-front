import React from "react";

function About() {
  return (
    <div>
      <h2>What is this?</h2>
      <p>
        this is a tSNS (tiny SNS) project with simple react-JS frontend and
        node-JS backend
      </p>
      <div
        style={{
          display: "inline",
          justifyContent: "space-around",
          width: "10%",
          alignItems: "center",
          border: "5px",
        }}
      >
        <div>
          <a href="https://www.google.com/search?q=react+redirect+to+another+page+doesnt&rlz=1C1CHBF_enCA918CA918&oq=react+redirect+to+another+page+doesnt&aqs=chrome..69i57j33i10i160.5411j0j7&sourceid=chrome&ie=UTF-8">
            see backend code
          </a>
        </div>
        <div>
          <a href="https://www.google.com/search?q=react+redirect+to+another+page+doesnt&rlz=1C1CHBF_enCA918CA918&oq=react+redirect+to+another+page+doesnt&aqs=chrome..69i57j33i10i160.5411j0j7&sourceid=chrome&ie=UTF-8">
            see frontend code
          </a>
        </div>
      </div>
    </div>
  );
}

export default About;
