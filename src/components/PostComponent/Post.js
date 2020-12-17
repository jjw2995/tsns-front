// https://picsum.photos/720
import React, { useState } from "react";
import { Button, Carousel } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deletePost } from "../../redux/posts/postsActions";
// import { useEffect } from "react";
// {
//     "reactions": {
//       "love": 0,
//       "haha": 0,
//       "sad": 0,
//       "angry": 0
//     },
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

  const user = useSelector((state) => state.auth.user);
  // const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const onDeleteHandler = (e) => {
    dispatch(deletePost(postID));
  };

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

  const date = new Date(createdAt)
    .toISOString()
    .split("T")[0]
    .replace(/-/g, "/");
  return (
    <div className="d-flex justify-content-center flex-wrap">
      <div
        className="card m-2"
        style={{ maxWidth: "50rem", minWidth: "50rem" }}
      >
        <div className="card-body">
          <div className="d-flex">
            <div className="column">
              <h4 className="card-title">{postOwner.nickname}</h4>
              <h6 className="card-subtitle mb-2 text-muted">
                created <b>{date}</b>, <b>{level}</b>
              </h6>
            </div>
            {user._id === postOwner._id && (
              <div style={{ marginLeft: "auto", zIndex: "1000" }}>
                <Button
                  type="button"
                  onClick={() => {
                    onDeleteHandler();
                  }}
                  style={{ zIndex: "1000" }}
                  size="sm"
                  variant="outline-dark"
                >
                  delete
                </Button>
              </div>
            )}
          </div>
          {media.length === 1 ? (
            <img
              src={media[0]}
              // id={postID + toString(index)}
              className="card-img"
              alt="not available"
            />
          ) : (
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
          )}
          <div>
            <p
              onClick={() => {
                setExpandText(!expandText);
              }}
              className={
                expandText
                  ? "card-text show-white-space"
                  : "hidden-text card-text show-white-space"
              }
              style={{ lineHeight: "normal", fontSize: "1.1em", margin: "2px" }}
            >
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
