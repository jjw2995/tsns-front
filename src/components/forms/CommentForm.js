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
        <div className="d-flex flex-row">
          <Form className="col p-0 m-0 d-flex flex-row">
            <div
              className="col p-0 m-0 d-flex flex-row justify-content-end"
              // style={{ alignItems: "stretch" }}
            >
              <Field
                type="text"
                id="content"
                name="content"
                as="textarea"
                rows="1"
                className="card"
                placeholder="comment..."
                // className="p-0 m-0 align-items-stretch"
                style={{
                  overflow: "hidden",
                  width: "80%",

                  minHeight: "2rem",
                  maxHeight: "2rem",
                }}
              />
              <Button
                variant="outline-dark"
                size="sm"
                // className="p-0 m-0 align-items-stretch"
                type="submit"
                onClick={() => {
                  // console.log("asd");
                }}
              >
                post
              </Button>
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
}

export default CommentForm;
