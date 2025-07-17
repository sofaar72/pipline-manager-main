import * as yup from "yup";

export const useFormSchema = () => {
  let formSchema = yup.object().shape({
    email: yup.string().email().required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  // check validity
  //   formSchema.isValid().then(function (valid) {
  //     valid; // => true
  //   });
  return { formSchema };
};
