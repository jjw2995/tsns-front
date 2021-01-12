import React from "react";
import { Form, Formik, Field } from "formik";
import { Button } from "react-bootstrap";
import Dropzone from "react-dropzone";
import { useDispatch } from "react-redux";
import { postPost } from "../../redux/posts/postsActions";
import Swal from "sweetalert2";

const MAX_NUM_IMAGES = 4;

function PostForm({ closeModal }) {
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{
        level: "public",
        description: "",
        images: [],
      }}
      onSubmit={(values) => {
        //   api request
        let formData = new FormData();
        formData.set("level", values.level);
        formData.set("description", values.description);
        values.images.forEach((r, i) => {
          formData.set(`${i}`, r);
        });
        dispatch(postPost(formData))
          .then((r) => {
            closeModal();
          })
          .catch((e) => {
            Swal.fire({
              icon: "error",
              title: "Not Posted",
              text: "must have a description",
            });
          });
      }}
    >
      {({ values, setFieldValue }) => (
        <div className="d-flex justify-content-center">
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
                      Drag 'n' drop up to <b>4</b> images here, or click to
                      select files
                    </p>
                  </div>
                </div>
              )}
            </Dropzone>
            {values.images.length > 0 ? (
              <div className="d-flex mb-3">
                {values.images.map((image, idx) => {
                  return (
                    <div
                      style={{
                        width: "8rem",
                        height: "8rem",
                        position: "relative",
                      }}
                      key={idx}
                      onClick={() => {}}
                    >
                      <img
                        alt="not available"
                        src={image.preview}
                        id={idx}
                        className="img-thumbnail"
                        style={{
                          width: "8rem",
                          height: "8rem",
                        }}
                      />

                      <Button
                        size="sm"
                        variant="dark"
                        style={{
                          position: "absolute",
                          right: "0",
                          top: "0",
                          zIndex: "1",
                        }}
                        type="button"
                        id={idx}
                        onClick={async (e) => {
                          let copy = [...values.images];
                          copy.splice(e.target.id, 1);

                          setFieldValue("images", copy);
                        }}
                      >
                        x
                      </Button>
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
              placeholder="images are optional, desription is NOT"
              style={{
                minHeight: "10rem",
                maxHeight: "10rem",
                fontSize: "1.4rem",
                marginTop: "auto",
              }}
            />

            <Button type="submit" className="m-5">
              POST
            </Button>
          </Form>
        </div>
      )}
    </Formik>
  );
}

export default PostForm;
