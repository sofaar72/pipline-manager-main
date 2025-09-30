// components/forms/LoginForm.js
import React, { useEffect } from "react";
import { Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import FormInputC from "../golbals/FormInputC";
import CbuttonOne from "../golbals/Buttons/CbuttonOne";
import ToastBox from "../golbals/ToastBox";
import { useFormSchema } from "../../hooks/useFormSchema";
import { useUser } from "../../hooks/useUser";
import { useAuth } from "../../assets/context/AuthContext";

const LoginForm = () => {
  const { formSchema } = useFormSchema();
  const { login, user, loading, error, success, accessToken, refreshToken } =
    useUser();
  const { setToken } = useAuth();
  const navigate = useNavigate();

  const initialValues = { email: "", password: "" };

  const submitForm = (values) => login(values);

  useEffect(() => {
    if (success && accessToken && refreshToken) {
      setToken(accessToken, refreshToken, user?.id || user?._id);
      navigate("/overview", { replace: true });
    }
  }, [success, accessToken, refreshToken]);

  return (
    <div className="w-[600px] max-w-[600px] flex justify-center items-center">
      {error && <ToastBox message={error} type="error" />}
      {success && <ToastBox message="Logged in!" type="success" />}

      <Formik
        initialValues={initialValues}
        validationSchema={formSchema}
        onSubmit={submitForm}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <form
            className="w-full max-w-[500px] flex flex-col gap-6 p-6"
            onSubmit={handleSubmit}
          >
            <h2 className="text-center text-white font-semibold">Login</h2>

            <FormInputC
              name="email"
              type="email"
              placeholder="Email"
              formValue={values.email}
              handleChange={handleChange}
              handleBlur={handleBlur}
              error={touched.email && errors.email}
            />

            <FormInputC
              name="password"
              type="password"
              placeholder="Password"
              formValue={values.password}
              handleChange={handleChange}
              handleBlur={handleBlur}
              error={touched.password && errors.password}
            />

            <p className="text-white text-sm">
              No account?{" "}
              <Link
                to="/register"
                className="text-[var(--primary-color-light)]"
              >
                Register
              </Link>
            </p>

            <CbuttonOne
              height="h-[40px]"
              color="var(--primary-color-lowest)"
              type="submit"
              loading={loading}
            >
              Login
            </CbuttonOne>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
