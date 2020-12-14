// https://picsum.photos/720
import React, { useState } from "react";
import "../css/App.css";
// import { ButtonGroup, ToggleButton, ToggleButtonGroup } from "react-bootstrap";

const imgurl = "https://picsum.photos/720";
const text =
  "Some quick example text\n\nto build on the card title and make up the \nbulk of the cample text to build on the card title and make up thebulk of the card'sle text to build on the card title and make up the\n\nbulk of the card'sle text to build on the card title and make up the\nbulk of the card's content.";

// public;
// followers;
// private;

// description;
// level;
// images;

// {
//     "reactions": {
//       "love": 0,
//       "haha": 0,
//       "sad": 0,
//       "angry": 0
//     },
//     "description": "PrivatePost",
//     "media": [
//       "https://storage.googleapis.com...",
//       "https://storage.googleapis.com...%3D"
//     ],
//     "level": "private",
//     "_id": "p5faaacd4ec3c410589fef8c6",
//     "user": {
//       "_id": "5faaacd0ec3c410589fef8c0",
//       "nickname": "user1"
//     },
//     "createdAt": "2020-11-10T15:08:04.316Z",
//     "updatedAt": "2020-11-10T15:08:04.316Z",
//     "userReaction": null
//   }

// const reactions = [
//   { name: "LOVE", value: 1 },
//   { name: "HAHA", value: 2 },
//   { name: "SAD", value: 3 },
//   { name: "ANGRY", value: 4 },
// ];
function Post() {
  const [expandText, setExpandText] = useState(false);
  // const [reactValue, setReactValue] = useState(3);

  // const [value, setValue] = useState(1);

  /*
   * The second argument that will be passed to
   * `handleChange` from `ToggleButtonGroup`
   * is the SyntheticEvent object, but we are
   * not using it in this example so we will omit it.
   */
  // const handleChange = (val) => {
  //   console.log(val);
  //   setValue(val);
  // };

  return (
    <div className="d-flex justify-content-center">
      <div
        className="card m-2"
        style={{ maxWidth: "50rem", minWidth: "50rem" }}
      >
        <div className="card-body">
          <h4 className="card-title">Card title</h4>

          <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
          <img src={imgurl} className="card-img" />
          {/* <button
            onClick={() => {
              setReactValue(2);
            }}
          >
            ASDAS
          </button> */}
          {/* <ToggleButtonGroup
            type="radio"
            name="options"
            defaultValue={1}
            onClick={(e) => {
              console.log(e.target);
            }}
          >
            <ToggleButton value={1}>Radio 1 (pre-checked)</ToggleButton>
            <ToggleButton value={2}>Radio 2</ToggleButton>
            <ToggleButton value={3}>Radio 3</ToggleButton>
          </ToggleButtonGroup> */}

          {/* <ToggleButtonGroup type="checkbox">
            {reactions.map((reaction, idx) => (
              <ToggleButton
                //   {reactValue === reaction.value? active:}
                key={idx}
                type="checkbox"
                value={reaction.value}
                checked={reactValue === reaction.value}
                // data-toggle=
                onChange={(e) => {
                  console.log(e);
                  setReactValue(e.currentTarget.value);
                }}
              >
                {reaction.name}
              </ToggleButton>
            ))}
          </ToggleButtonGroup> */}
          <p
            onClick={() => {
              setExpandText(!expandText);
            }}
            className={
              expandText
                ? "card-text show-white-space"
                : "hidden-text card-text show-white-space"
            }
            style={{ lineHeight: "1em", fontSize: "1.3em", margin: "2px" }}
          >
            {text}
          </p>
          {/* <a href="#" className="card-link">
            Card link
          </a>
          <a href="#" className="card-link">
            Another link
          </a> */}
          {/* <button
            onSubmit={() => {
              //   dasd;
            }}
          >
            ...
          </button> */}
        </div>
      </div>
    </div>
  );
}

export default Post;
