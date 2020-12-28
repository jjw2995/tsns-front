import React from "react";
import Dropzone from "react-dropzone";

function imageDropZone() {
  return (
    <Dropzone>
      {({ getRootProps, getInputProps }) => (
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <p>Drag 'n' drop some files here, or click to select files</p>
        </div>
      )}
    </Dropzone>
  );
}

export default imageDropZone;
