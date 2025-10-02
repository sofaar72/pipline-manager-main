import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import FormInputC from "../golbals/FormInputC";
import CbuttonOne from "../golbals/Buttons/CbuttonOne";
import { userAddFormSchema } from "../../hooks/useFormSchema";
import { useUser } from "../../hooks/useUser";

import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../assets/context/AuthContext";
import Lottie from "lottie-react";
import animationData from "../../assets/lotties/amongUs.json";
import { DropDownModalWrapper } from "../taskmanager/DropDownModalWrapper";
import { FaSpinner } from "react-icons/fa";

const AddUserForm = ({ openModal }) => {
  const [openDropDown, setOpenDropDown] = useState({ roles: false });
  const { formSchema } = userAddFormSchema();

  const initialValues = {
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    roles: "",
  };
  const { setToken } = useAuth();
  const {
    registerLoading,
    registerError,
    registerSuccess,
    registerUser,
    register,
    getUserRoles,
    roleResults,
    roleLoading,
    roleError,
  } = useUser();
  const navigate = useNavigate();

  const submitForm = async (values) => {
    const result = await register(values);
    // register(values);

    // console.log(result);

    if (result) {
      openModal(false); // ✅ close the modal only if registration succeeded
    } else {
      // handle error if needed
    }
    // openModal(false);
  };

  // const roleSetDropdownHandler = () => {
  //   setOpenDropDown({ ...openDropDown, roles: !openDropDown.roles });
  // };
  // const animationData = "/lottie/ghost.json";

  useEffect(() => {
    getUserRoles();
  }, []);

  return (
    <div
      className="basis-1/3 max-w-[600px] h-full flex items-center justify-center relative"
      onClick={(e) => e.stopPropagation()}
    >
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
          setFieldValue,
          isSubmitting,
        }) => (
          <form
            className="w-full h-[700px] max-w-[500px]  flex flex-col justify-center gap-[40px] bg-[#302E5E] radius p-[40px]"
            onSubmit={handleSubmit}
          >
            <h2 className={` text-center  uppercase font-[600] text-white`}>
              Add User
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

            {/* Role  */}
            {/* Production Type */}
            <div className="w-full relative">
              <DropDownModalWrapper
                openDropDown={openDropDown?.roles}
                closeDropDown={setOpenDropDown}
                items={roleResults}
                setItems={(item) => setFieldValue("roles", item.name)}
                selectedType={"roles"}
              >
                <DropDownModalWrapper.Title>
                  <div
                    className="w-full flex items-center justify-between gap-2 cursor-pointer border-b border-white/40 p-2 relative"
                    onClick={() =>
                      setOpenDropDown({
                        ...openDropDown,
                        roles: !openDropDown.roles,
                      })
                    }
                  >
                    {/* {errors.role && touched.role && (
                      <p className="absolute top-0 right-10 text-red-500 text-sm">
                        {errors.role}
                      </p>
                    )} */}
                    <span className="text-sm text-white">
                      {values.roles || "Role"}
                    </span>
                    <img
                      src="/icons/Arrow Down.svg"
                      alt="arrow"
                      className={`transition ${
                        openDropDown.roles ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  </div>
                </DropDownModalWrapper.Title>
                <DropDownModalWrapper.TypeTwo />
              </DropDownModalWrapper>
            </div>
            <CbuttonOne
              height="h-[40px]"
              color="var(--primary-color-lowest)"
              type="submit"
              loading={registerLoading}
              disabled={registerLoading}
            >
              <span className="text-sm">Add User</span>
              {/* {registerLoading && (
                <span className="text-sm">
                  <FaSpinner className="animate-spin" />
                </span>
              )} */}
            </CbuttonOne>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default AddUserForm;
