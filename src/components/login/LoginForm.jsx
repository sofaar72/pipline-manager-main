import React, { useEffect } from "react";
import { Formik } from "formik";
import FormInputC from "../golbals/FormInputC";
import CbuttonOne from "../golbals/Buttons/CbuttonOne";
import { useFormSchema } from "../../hooks/useFormSchema";
import { useUser } from "../../hooks/useUser";
import { toast, ToastContainer } from "react-toastify";
import ToastBox from "../golbals/ToastBox";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../assets/context/AuthContext";

const LoginForm = () => {
  const { formSchema } = useFormSchema();
  const initialValues = {
    email: "moghadam_h@arssin.com",
    password: "Hm@123456",
  };
  const { setToken } = useAuth();
  const { login, user, loading, error, success, accessToken, refreshToken } =
    useUser();
  const navigate = useNavigate();

  const submitForm = (values) => {
    login(values);
  };

  useEffect(() => {
    if (success && accessToken && refreshToken) {
      setToken(accessToken, refreshToken);
      navigate("/task-manager/production");
    }
  }, [success]);

  return (
    <div className="basis-1/3 max-w-[600px] h-full flex items-center justify-center">
      {error ? (
        <ToastBox message={error} type="error" />
      ) : success ? (
        <ToastBox message={"User is logged in"} type="success" />
      ) : null}
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
            className="w-full max-w-[500px]  flex flex-col gap-[40px] bg-gray-500/20 radius p-[40px]"
            onSubmit={handleSubmit}
          >
            <h2 className={` text-center  uppercase font-[600] text-white`}>
              login User
            </h2>
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

            <CbuttonOne
              height="h-[40px]"
              color="var(--primary-color-lowest)"
              type="submit"
              loading={loading}
            >
              <span className="text-sm">Login</span>
            </CbuttonOne>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
