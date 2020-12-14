import React, { useState } from "react";
import { Form, Formik, Field } from "formik";
import { Button } from "react-bootstrap";
import Dropzone, { useDropzone } from "react-dropzone";
import imageDropZone from "./imageDropZone";
import PreviewImgs from "../PreviewImgs";
import Axios from "axios";

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
const MAX_NUM_IMAGES = 4;

function PostForm() {
  return (
    <Formik
      initialValues={{
        level: "public",
        description: "",
        images: [],
      }}
      onSubmit={(values) => {
        //   api request
        console.log(values);
        Axios.post();
      }}
    >
      {({ values, setFieldValue }) => (
        <Form
          className="d-flex flex-column"
          style={{ width: "30rem", height: "30rem" }}
        >
          <div>
            <label htmlFor="private">
              <Field
                type="radio"
                id="level"
                name="level"
                value="private"
              ></Field>
              Private
            </label>
            <label htmlFor="followers">
              <Field
                type="radio"
                id="level"
                name="level"
                value="followers"
              ></Field>
              Followers
            </label>
            <label htmlFor="public">
              <Field
                type="radio"
                id="level"
                name="level"
                value="public"
              ></Field>
              Public
            </label>
          </div>
          <Dropzone
            onDrop={(acceptedFiles, rejectedFiles) => {
              if (
                rejectedFiles.length ||
                acceptedFiles.length + values.images.length > MAX_NUM_IMAGES
              ) {
                alert("cannot put more then 4 items or wrong file");
              } else {
                setFieldValue("images", [
                  ...values.images,
                  ...acceptedFiles.map((elem) => {
                    elem.preview = URL.createObjectURL(elem);
                    return elem;
                  }),
                ]);

                console.log(values.images);
              }
            }}
            maxFiles={MAX_NUM_IMAGES}
          >
            {({ getRootProps, getInputProps }) => (
              <div>
                <div
                  {...getRootProps({
                    className: "form-control",
                    style: {
                      height: "4rem",
                      display: "flex",
                      justifyContent: "center",
                    },
                  })}
                >
                  <input {...getInputProps()} />
                  <p>
                    Drag 'n' drop up to <b>4</b> images here, or click to select
                    files
                  </p>
                </div>
              </div>
            )}
          </Dropzone>
          {values.images.length > 0 ? (
            <div className="d-flex">
              {values.images.map((image, idx) => {
                return (
                  <div
                    // style={{ display: "-webkit-flex column" }}
                    key={idx}
                    onClick={() => {}}
                  >
                    <img
                      src={image.preview}
                      id={idx}
                      className="img-thumbnail m-2"
                      style={{ width: "8rem", height: "8rem" }}
                    />

                    <button
                      className="d-flex fixed-botton mb-2"
                      type="button"
                      id={idx}
                      // key={idx}
                      onClick={async (e) => {
                        let copy = [...values.images];
                        copy.splice(e.target.id, 1);

                        setFieldValue("images", copy);
                      }}
                    >
                      (x)
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            <br />
          )}

          <Field
            type="text"
            id="description"
            name="description"
            as="textarea"
            style={{
              minHeight: "10rem",
              maxHeight: "10rem",
              fontSize: "1.4rem",
            }}
          />

          {/* <Field type="text" id="images" name="images" /> */}
          <Button type="submit" className="m-5">
            POST
          </Button>
          {/* <button className="mt-3 h5 bg-light rounded">post</button> */}
          <div>
            <pre>{JSON.stringify(values, null, 2)}</pre>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default PostForm;
