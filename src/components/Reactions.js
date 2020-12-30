// import { Tooltip } from "bootstrap";
import React from "react";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";

const emotes = {
  love: "♥ ‿ ♥",
  haha: "≥ ∇ ≤",
  sad: "╯︵╰,",
  angry: "ಠ ∩ಠ",
};

function Reactions({
  contentID,
  userReaction,
  reactions,
  postReact,
  deleteReact,
  style,
}) {
  const onReactionClick = (e) => {
    let emote = e.target.value;

    if (emote === userReaction) {
      deleteReact();
    } else {
      postReact(emote);
    }
  };

  return (
    <div className="my-2 d-flex">
      {Object.keys(reactions).map((r) => {
        return (
          <div key={contentID + r} className="mx-1">
            {reactions[r]}
            <OverlayTrigger
              // placement="right"
              delay={{ show: 250, hide: 400 }}
              placement="top"
              overlay={
                <Tooltip id={`button-tooltip`}>
                  <h5>{r}</h5>
                </Tooltip>
              }
            >
              <Button
                className="mx-1"
                size="sm"
                style={style}
                variant={userReaction === r ? "dark" : "outline-dark"}
                key={contentID + r}
                value={r}
                onClick={onReactionClick}
              >
                {emotes[r]}
              </Button>
            </OverlayTrigger>
          </div>
        );
      })}
    </div>
  );
}

export default Reactions;
