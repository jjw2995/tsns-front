// const ffn = () => {};

// const fn = () => () => {};

function a(cb) {
  console.log("b4");
  cb();
  console.log("after");
}

a(() => console.log("hello"));
