import * as Yup from "yup";

export const RegisterFormHandle = Yup.object().shape({
  name: Yup.string()
    .min(6, "Too Short!")
    .max(40, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Please enter your password.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must include at least one lowercase letter, one uppercase letter, and one digit"
    ),
  password_confirmation: Yup.string()
    .oneOf([Yup.ref("password")], "Your Passwords do not match.")
    .required("Confirm password is required."),
});