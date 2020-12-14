const { TextField } = require("@material-ui/core");
const { useField } = require("formik");

export const MyTextField = ({ placeholder, ...props }) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : "";
  // console.log(errorText);
  return (
    <div>
      <TextField
        placeholder={placeholder}
        {...field}
        // helperText={errorText}
        // type={showPass ? "text" : "password"}
        error={!!errorText}
      />
      <div className="px-5 text-danger">
        <small>{errorText}</small>
      </div>
    </div>
  );
};

export const MyPasswordField = ({ placeholder, showPass, ...props }) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : "";

  return (
    <div>
      <TextField
        placeholder={placeholder}
        {...field}
        // helperText={errorText}
        type={showPass ? "text" : "password"}
        error={!!errorText}
      />
      <div className="px-5 text-danger">
        <small>{errorText}</small>
      </div>
    </div>
  );
};
