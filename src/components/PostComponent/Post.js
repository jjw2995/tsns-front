// https://picsum.photos/720
import React, { useState } from "react";
import { Carousel } from "react-bootstrap";
// import { useEffect } from "react";

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
function Post({ post }) {
  const [expandText, setExpandText] = useState(false);
  const {
    createdAt,
    description,
    level,
    media,
    reactions,
    user: postOwner,
    userReaction,
    _id: postID,
  } = post;
  //   <Carousel>
  // <Carousel.Item>
  //   <img
  //     className="d-block w-100"
  //     src="holder.js/800x400?text=First slide&bg=373940"
  //     alt="First slide"
  //   />
  //   <Carousel.Caption>
  //     <h3>First slide label</h3>
  //     <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
  //   </Carousel.Caption>
  // </Carousel.Item>
  const date = new Date(createdAt)
    .toISOString()
    .split("T")[0]
    .replace(/-/g, "/");
  // .split("-");
  // date = date.toISOString().split("T")[0];
  return (
    <div className="d-flex justify-content-center flex-wrap">
      <div
        className="card m-2"
        style={{ maxWidth: "50rem", minWidth: "50rem" }}
      >
        <div className="card-body">
          <h4 className="card-title">{postOwner.nickname}</h4>
          <h6 className="card-subtitle mb-2 text-muted">
            created <b>{date}</b>, <b>{level}</b>
          </h6>

          <Carousel interval={null} wrap={false}>
            {media.map((r, index) => {
              // console.log(postID + index);
              return (
                <Carousel.Item key={postID + index}>
                  <img
                    src={r}
                    // id={postID + toString(index)}
                    className="card-img"
                    alt="not available"
                  />
                </Carousel.Item>
              );
            })}
          </Carousel>

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
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Post;
