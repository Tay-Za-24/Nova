import * as Yup from "yup";

export const LoginFormHandle = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(8)
    .required("Please enter your password.")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "Password must include"),
});