import React, { useState } from "react";
import { Button, Carousel } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  deletePost,
  deletePostReaction,
  postPostReaction,
} from "../../redux/posts/postsActions";
import CommentSection from "../commentComponent/CommentSection";
import Reactions from "../Reactions";

function Post({ post, idx }) {
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

  const [expandText, setExpandText] = useState(false);

  const user = useSelector((state) => state.auth.user);
  // const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();

  const onDeleteHandler = (e) => {
    dispatch(deletePost(postID));
  };

  const postReact = (reaction) => {
    dispatch(postPostReaction(postID, idx, reaction));
  };

  const deleteReact = () => {
    dispatch(deletePostReaction(postID, idx));
  };

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
              <Link
                className="card-title"
                style={{ textDecoration: "none", color: "inherit" }}
                to={`/explore/users/${postOwner._id}`}
              >
                <h4>{postOwner.nickname}</h4>
              </Link>
              <h6 className="card-subtitle mb-2 text-muted">
                <b>{level}</b>, created <b>{date}</b>
              </h6>
            </div>
            {user._id === postOwner._id && (
              <div style={{ marginLeft: "auto" }}>
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

          {media.length === 0 ? (
            <hr
              className="dashed"
              style={{
                margin: "0px",
                height: "1px",
                // backgroundColor: "black",
                borderTop: "1px dashed grey",
              }}
            />
          ) : (
            <div>
              {media.length === 1 ? (
                <img src={media[0]} className="card-img" alt="not available" />
              ) : (
                <Carousel interval={null} wrap={false}>
                  {media.map((r, index) => {
                    return (
                      <Carousel.Item key={postID + index}>
                        <img src={r} className="card-img" alt="not available" />
                      </Carousel.Item>
                    );
                  })}
                </Carousel>
              )}
            </div>
          )}
          <div>
            <Reactions
              contentID={postID}
              userReaction={userReaction}
              reactions={reactions}
              postReact={postReact}
              deleteReact={deleteReact}
            />
            <p
              onClick={() => {
                setExpandText(!expandText);
              }}
              className={
                expandText
                  ? "card-text show-white-space"
                  : "hidden-text card-text show-white-space"
              }
              style={{
                lineHeight: "normal",
                fontSize: "1.3rem",
                // margin: "2px",
              }}
            >
              {description}
            </p>
          </div>
        </div>
        <div className="m-2">
          <CommentSection postID={post._id} />
        </div>
      </div>
    </div>
  );
}

export default Post;
