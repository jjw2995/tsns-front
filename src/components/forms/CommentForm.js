import { Formik, Form, Field } from "formik";

import React from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { postComment } from "../../redux/comments/commentsActions";

function CommentForm({ postID, parentCommentID = null }, ...rest) {
  // const ComInput = ({ postID, parentCommentID = null }) => {
  const dispatch = useDispatch();
  //     // console.log(postID);
  return (
    <Formik
      initialValues={{ content: "" }}
      onSubmit={(values) => {
        console.log(values);
        dispatch(postComment(postID, parentCommentID, values.content));
      }}
    >
      {({}) => (
        <div className="container d-flex flex-row">
          <Form className="col p-0 m-0">
            <Field
              type="text"
              id="content"
              name="content"
              as="textarea"
              // className="flex-row"
              placeholder="comment..."
              style={{
                // height: "2rem",
                // minHeight: "1.1rem",
                // maxHeight: "1.1rem",
                overflow: "hidden",
                padding: "0",
                margin: "0",
                // fontSize: "1rem",
                // marginTop: "auto",
              }}
            />
            <Button
              variant="outline-dark"
              size="sm"
              className="p-0 m-0"
              type="submit"
              onClick={() => {
                // console.log("asd");
              }}
            >
              post
            </Button>
          </Form>
        </div>
      )}
    </Formik>
  );
}

export default CommentForm;
