import React, { useEffect } from "react";
import { Formik } from "formik";
import FormInputC from "../golbals/FormInputC";
import CbuttonOne from "../golbals/Buttons/CbuttonOne";
import { useRegisterFormSchema } from "../../hooks/useFormSchema";
import { useUser } from "../../hooks/useUser";
import { toast, ToastContainer } from "react-toastify";
import ToastBox from "../golbals/ToastBox";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../assets/context/AuthContext";
import Lottie from "lottie-react";
import animationData from "../../assets/lotties/amongUs.json";

const RegisterFrom = () => {
  const { formSchema } = useRegisterFormSchema();
  const initialValues = {
    email: "",
    password: "",
    first_name: "",
    last_name: "",
  };
  const { setToken } = useAuth();
  const {
    registerLoading,
    registerError,
    registerSuccess,
    registerUser,
    register,
  } = useUser();
  const navigate = useNavigate();

  const submitForm = (values) => {
    register(values);
  };

  useEffect(() => {
    if (registerSuccess) {
      navigate("/login");
    }
  }, [registerSuccess]);

  // const animationData = "/lottie/ghost.json";

  return (
    <div className="w-[600px] max-w-[600px] h-full flex items-center justify-center relative">
      <div className="absolute top-[100px] right-1/2 translate-x-1/2 ">
        {/* <Lottie animationData={animationData} loop={true} /> */}
      </div>

      <Formik
        initialValues={{ ...initialValues }}
        validationSchema={formSchema}
        onSubmit={submitForm}
      >
        {({
          values,
          touched,
          errors,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form
            className="w-full h-[700px] max-w-[500px]  flex flex-col justify-center gap-[40px] bg-[var(--primary-color-light)]/5 radius p-[40px]"
            onSubmit={handleSubmit}
          >
            <h2 className={` text-center  uppercase font-[600] text-white`}>
              Register User
            </h2>
            <FormInputC
              name="first_name"
              type="text"
              placeholder="Enter your first name"
              formValue={values.first_name}
              handleChange={handleChange}
              handleBlur={handleBlur}
              error={touched.first_name && errors.first_name}
            />
            <FormInputC
              name="last_name"
              type="text"
              placeholder="Enter your last name"
              formValue={values.last_name}
              handleChange={handleChange}
              handleBlur={handleBlur}
              error={touched.last_name && errors.last_name}
            />
            <FormInputC
              name="email"
              type="email"
              placeholder="Enter your email"
              formValue={values.email}
              handleChange={handleChange}
              handleBlur={handleBlur}
              error={touched.email && errors.email}
            />
            <FormInputC
              name="password"
              label="Password"
              type="password"
              placeholder="Enter your password"
              handleChange={handleChange}
              handleBlur={handleBlur}
              formValue={values.password}
              error={touched.password && errors.password}
            />

            <p className="text-white text-sm font-[200]">
              Already have an account?{" "}
              <Link to="/login" className="text-[var(--primary-color-light)]">
                Login
              </Link>
            </p>

            <CbuttonOne
              height="h-[40px]"
              color="var(--primary-color-lowest)"
              type="submit"
              loading={registerLoading}
            >
              <span className="text-sm">Register</span>
            </CbuttonOne>
          </form>
        )}
      </Formik>

      <ToastContainer />
    </div>
  );
};

export default RegisterFrom;
