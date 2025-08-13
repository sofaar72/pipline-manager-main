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

export const useRegisterFormSchema = () => {
  let formSchema = yup.object().shape({
    first_name: yup.string().required("This field may not be blank"),
    last_name: yup.string().required("This field may not be blank"),
    email: yup.string().email().required("Email is required"),
    password: yup.string().required("Password is required"),
  });

  // check validity
  //   formSchema.isValid().then(function (valid) {
  //     valid; // => true
  //   });

  return { formSchema };
};
export const userAddFormSchema = () => {
  let formSchema = yup.object().shape({
    first_name: yup.string().required("This field may not be blank"),
    last_name: yup.string().required("This field may not be blank"),
    email: yup.string().email().required("Email is required"),
    password: yup.string().required("Password is required"),
    // role: yup.string().required("Role is required"),
  });

  // check validity
  //   formSchema.isValid().then(function (valid) {
  //     valid; // => true
  //   });

  return { formSchema };
};

export const usecreateProjectSchema = () => {
  let formSchema = yup.object().shape({
    name: yup.string().required("This field may not be blank"),
    code: yup.string().required("This field may not be blank"),
    production_type: yup.string().required("is not a valid choice."),
    status: yup.string().required("is not a valid choice."),
    root_dir: yup
      .string()
      .required("This field may not be blank")
      .max(150, "This field length must be less than 150 characters"),
    // team: yup.array().of(yup.string()).required("Team is required"),
  });

  return { formSchema };
};

export const useEntityFormSchema = () => {
  let formSchema = yup.object().shape({
    entity_name: yup.string().required("This field may not be blank"),
    project: yup.string().required("This field may not be blank"),
    type: yup.string().required("This field may not be blank"),
    location: yup.string().required("This field may not be blank"),
  });

  // check validity
  //   formSchema.isValid().then(function (valid) {
  //     valid; // => true
  //   });

  return { formSchema };
};
