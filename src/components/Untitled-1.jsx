// https://picsum.photos/720
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import { Favorite, InsertEmoticon, ThumbUpAlt } from "@material-ui/icons";
import React from "react";
import { Ellipsis } from "react-bootstrap/esm/PageItem";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "100%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
  h1: {
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    width: "150px",
  },
  //   h1:hover {
  //       overflow:"visivle"
  //   }
}));

function Post() {
  const classes = useStyles();
  let a = [];
  return (
    <div>
      <Card className={classes.root}>
        {/* <Typography noWrap={true}>
          qwe qdasd asfw w qweqe w weq qwewq e asdsad fssadasd aafqfgdfh d sfssf
          ada asdaqwe qdasd asfw w qweqe w weq qwewq e asdsad fssadasd aafqfgdfh d
          sfssf ada asdaqwe qdasd asfw w qweqe w weq qwewq e asdsad fssadasd
          aafqfgdfh d sfssf ada asda
        </Typography> */}
        <CardHeader
          //   className={classes.root}
          avatar={<Avatar aria-label="profilePic"></Avatar>}
          title="nickname"
          subheader="upload time"
          action={<IconButton aria-label="settings">...</IconButton>}
        />
        <CardMedia
          className={classes.media}
          image="https://picsum.photos/720"
        />
        <CardContent>
          {/* TODO: hide if more than 100 words, expand on click */}

          <Typography
            numberOfLines={1}
            variant="body2"
            //   color="textSecondary"
            //   component="p"
            noWrap={true}
            //   style="max-witdh:150ox"
          >
            post Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Aliquid officiis quas assumenda, voluptas sint ex at inventore
            consequatur atque voluptatem veniam mollitia ullam, dolor aspernatur
            labore voluptates facere aperiam nam.
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <div className="d-flex flex-row">
            <IconButton aria-label="love">
              <Typography variant="body2" color="textPrimary" size="small">
                love
              </Typography>
            </IconButton>

            <IconButton aria-label="haha">
              {/* <InsertEmoticon  /> */}
              <Typography variant="body2" color="textPrimary">
                haha
              </Typography>
            </IconButton>

            <IconButton aria-label="sad">
              <Typography variant="body2" color="textPrimary">
                sad
              </Typography>
            </IconButton>

            <IconButton aria-label="angry">
              <Typography variant="body2" color="textPrimary">
                angry
              </Typography>
            </IconButton>
          </div>
        </CardActions>
      </Card>
    </div>
  );
}

export default Post;

import Modal from "react-modal";
import React, { useEffect, useState } from "react";
import BaseUrlAxios from "../../rest/AuthedAxios";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

function ModalShowFollowUsers({ path, title, isShow }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [follows, setFollows] = useState();
  console.log(path);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const getFollows = () => {
    BaseUrlAxios()
      .get(`${path}`)
      .then((r) => {
        setFollows(r.data);
      });
  };

  const getMoreFollows = () => {
    if (follows && follows.length > 0) {
      console.log(follows[follows.length - 1]._id);
      BaseUrlAxios()
        .get(`${path}?last-doc-id=${follows[follows.length - 1]._id}`)
        .then((r) => {
          console.log(r.data);
          setFollows((pre) => {
            console.log([...pre, ...r.data]);
            return [...pre, ...r.data];
          });
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  return (
    <div>
      <Button
        // disabled={!isShow}
        className="m-2"
        onClick={() => {
          if (isShow) {
            openModal();
          }
        }}
      >
        <h4>{title}</h4>
      </Button>
      <Modal
        style={{
          overlay: {
            // zIndex: "1000",
          },
          content: {
            top: "13%",
            bottom: "13%",
            left: "25%",
            right: "25%",
            fontFamily: "sans-serif",
          },
        }}
        isOpen={modalIsOpen}
        onAfterOpen={getFollows}
        onRequestClose={closeModal}
      >
        <h3>{title}</h3>
        {follows &&
          follows.length > 0 &&
          follows.map((r) => {
            return (
              <Link
                key={r._id}
                className="list-group-item list-group-item-action m-2"
                to={`/explore/users/${r.user._id}`}
              >
                <h4>{r.user.nickname}</h4>
              </Link>
            );
          })}
        <div className="justify-content-center d-flex">
          <button className="btn btn-secondary " onClick={getMoreFollows}>
            get more
          </button>
        </div>
        <Button
          variant="dark"
          style={{
            position: "absolute",
            right: "0",
            top: "0",
            zIndex: "1",
          }}
          type="button"
          onClick={closeModal}
        >
          x
        </Button>
      </Modal>
    </div>
  );
}

function FollowersFollowees({ id, isShow }) {
  const [followCounts, setFollowCounts] = useState({
    followeesCount: 0,
    followersCount: 0,
  });

  useEffect(() => {
    BaseUrlAxios()
      .get("/follows/count")
      .then((r) => {
        console.log("HERE");
        console.log(r.data);
        setFollowCounts((pre) => {
          return { ...pre, ...r.data };
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  return (
    <div className="container">
      <div>{id}</div>

      {/* <h4>followings followers list</h4> */}
      <div></div>
      {/* {!isShow ? (
        <div>
          <div>{followCounts.followersCount} - Followers</div>
          <div>{followCounts.followeesCount} - Followees</div>
        </div>
      ) : ( */}
      <div className="row">
        <div className="col">
          <ModalShowFollowUsers
            path="/followers"
            title={`${followCounts.followersCount} - Followers`}
            isShow={isShow}
          />
        </div>
        <div className="col">
          <ModalShowFollowUsers
            path="/followees"
            title={`${followCounts.followeesCount} - Followees`}
            isShow={isShow}
          />
        </div>
      </div>

      {/* {follows ? (
        <div className="d-flex row">
          <div className="col">
            followers
            {follows.followers &&
              follows.followers.length > 0 &&
              follows.followers.map((r) => {
                return <div key={r._id}>{r.nickname}</div>;
              })}
          </div>
          <div className="col">
            followees
            {follows.followees &&
              follows.followees.length > 0 &&
              follows.followees.map((r) => {
                return <div key={r._id}>{r.nickname}</div>;
              })}
          </div>
        </div>
      ) : (
        <div></div>
      )} */}

      {/* <div>{isShow ? <div>true</div> : <div>false</div>}</div> */}
    </div>
  );
}

export default FollowersFollowees;
