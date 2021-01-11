import * as yup from "yup";

export const nickname = yup
  .string()
  .matches(
    /^[a-zA-Z0-9_]{3,16}$/,
    "3~16 alphanumeric (including underscore) characters"
  )
  .required();

export const email = yup.string().max(30).email().required();

export const password = yup
  .string()
  .matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,32})/,
    "8~32 characters containing at least one number, lowercase, UPPERCASE, and special character"
  )
  .required();

export const confirmPassword = yup
  .string()
  .oneOf([yup.ref("password")], "Passwords must match")
  .required("confirm your password");

export const yupObj = yup.object;
