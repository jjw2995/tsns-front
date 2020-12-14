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
