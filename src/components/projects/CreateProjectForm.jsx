import React, { useState, useRef } from "react";
import CbuttonOne from "../golbals/Buttons/CbuttonOne";
import { DropDownModalWrapper } from "../taskmanager/DropDownModalWrapper";
import { FaPen, FaPlus } from "react-icons/fa";
import { useProject } from "../../hooks/useProject";
import Loading from "../golbals/Loading";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { usecreateProjectSchema } from "../../hooks/useFormSchema";
import { Formik } from "formik";
import DateInput from "../golbals/DateInput";

const productionTypes = [
  { name: "FILM" },
  { name: "TV" },
  { name: "COM" },
  { name: "GAME" },
  { name: "OTHER" },
];

const statuses = [
  { name: "PLN" },
  { name: "ACT" },
  { name: "HLD" },
  { name: "CMP" },
  { name: "CAC" },
];

const CreateProjectForm = () => {
  const { formSchema } = usecreateProjectSchema();
  const navigate = useNavigate();
  const avatarRef = useRef(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [openDropDown, setOpenDropDown] = useState({
    production: false,
    status: false,
    members: false,
  });

  const handleDateStart = (e) => {
    console.log(e.target.value);
  };
  const triggerDateStart = () => {
    dateStartRef.current.click();
  };
  const dateStartRef = useRef(null);
  const dateEndRef = useRef(null);

  const triggerDateEnd = () => {
    dateEndRef.current.click();
  };

  const { createTheProject, createdProjectLoading } = useProject();

  const navigateToProject = () => {
    navigate(`/projects/select`);
  };

  return (
    <div className="w-full h-full flex items-center justify-center gap-4 bg-[var(--create-project-form-bg)] sec-padd overflow-hidden radius shrink-0">
      <Formik
        initialValues={{
          name: "",
          code: "",
          production_type: "",
          status: "",
          root_dir: "",
          team: [],
          avatar: null,
          start_date: "",
          end_date: "",
        }}
        validationSchema={formSchema}
        onSubmit={(values, { setSubmitting }) => {
          console.log(values);
          const formData = new FormData();
          formData.append("avatar", values.avatar);
          formData.append("name", values.name);
          formData.append("code", values.code);
          formData.append("production_type", values.production_type);
          formData.append("status", values.status);
          formData.append("root_dir", values.root_dir);
          createTheProject(values); // Or pass formData if backend expects it
          setSubmitting(false);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
          isSubmitting,
        }) => (
          <form
            onSubmit={handleSubmit}
            className="w-full h-full flex flex-col sec-padd create-project-form-bg radius"
          >
            <div className="w-full flex items-center justify-between gap-4 sec-padd">
              <h1 className="text-lg font-semibold">Create Project</h1>
              <CbuttonOne
                color="var(--primary-color-lower)"
                height="h-[40px] min-w-[140px] font-bold"
                onClick={navigateToProject}
              >
                Select Project
              </CbuttonOne>
            </div>

            <p className="text-sm sec-padd">
              Create a new project to start working on your tasks.
            </p>

            <div className="w-full h-full flex flex-col gap-4 create-innerofrom sec-padd radius">
              {/* Avatar Upload */}
              <div className="w-full flex items-center justify-between gap-[60px]">
                <div
                  className="w-[100px] h-[100px] rounded-full flex items-center justify-center bg-white/10 relative cursor-pointer"
                  onClick={() => avatarRef.current.click()}
                >
                  {avatarPreview ? (
                    <div className="absolute w-full h-full flex items-center justify-center bg-white/10 rounded-full">
                      <img
                        src={avatarPreview}
                        alt="avatar"
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                  ) : (
                    <FaPlus className="text-white text-2xl" />
                  )}
                  <div className="absolute bottom-0 right-0 w-[30px] h-[30px] bg-white rounded-full flex items-center justify-center">
                    <FaPen className="text-black text-sm" />
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    ref={avatarRef}
                    name="avatar"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const imageURL = URL.createObjectURL(file);
                        setAvatarPreview(imageURL);
                        setFieldValue("avatar", file);
                      }
                    }}
                  />
                </div>
              </div>

              {/* Project Name & Code */}
              <div className="w-full flex items-center justify-between gap-[60px]">
                <div className="w-full relative">
                  <input
                    name="name"
                    type="text"
                    placeholder="Project Name"
                    value={values.name}
                    onChange={handleChange}
                    className="placeholder:text-white text-sm input-create p-2"
                  />
                  {errors.name && touched.name && (
                    <p className="absolute top-0 right-0 text-red-500 text-sm">
                      {errors.name}
                    </p>
                  )}
                </div>
                <div className="w-full relative">
                  <input
                    name="code"
                    type="text"
                    placeholder="Project Code"
                    value={values.code}
                    onChange={handleChange}
                    className="placeholder:text-white text-sm input-create p-2"
                  />
                  {errors.code && touched.code && (
                    <p className="absolute top-0 right-0 text-red-500 text-sm">
                      {errors.code}
                    </p>
                  )}
                </div>
              </div>

              {/* Dropdowns */}
              <div className="w-full flex items-center justify-between gap-[60px]">
                {/* Production Type */}
                <div className="w-full relative">
                  <DropDownModalWrapper
                    openDropDown={openDropDown.production}
                    closeDropDown={setOpenDropDown}
                    items={productionTypes}
                    setItems={(type) =>
                      setFieldValue("production_type", type.name)
                    }
                    selectedType={"production"}
                  >
                    <DropDownModalWrapper.Title>
                      <div
                        className="w-full flex items-center justify-between gap-2 cursor-pointer border-b border-white/40 p-2 relative"
                        onClick={() =>
                          setOpenDropDown({
                            ...openDropDown,
                            production: !openDropDown.production,
                          })
                        }
                      >
                        {errors.production_type && touched.production_type && (
                          <p className="absolute top-0 right-10 text-red-500 text-sm">
                            {errors.production_type}
                          </p>
                        )}
                        <span className="text-sm text-white">
                          {values.production_type || "Production type"}
                        </span>
                        <img
                          src="/icons/Arrow Down.svg"
                          alt="arrow"
                          className={`transition ${
                            openDropDown.production ? "rotate-180" : "rotate-0"
                          }`}
                        />
                      </div>
                    </DropDownModalWrapper.Title>
                    <DropDownModalWrapper.TypeTwo />
                  </DropDownModalWrapper>
                </div>

                {/* Status */}
                <div className="w-full relative z-[2000]">
                  <DropDownModalWrapper
                    openDropDown={openDropDown.status}
                    closeDropDown={setOpenDropDown}
                    items={statuses}
                    setItems={(status) => setFieldValue("status", status.name)}
                    selectedType={"status"}
                  >
                    <DropDownModalWrapper.Title>
                      <div
                        className="w-full flex items-center justify-between gap-2 cursor-pointer border-b border-white/40 p-2"
                        onClick={() =>
                          setOpenDropDown({
                            ...openDropDown,
                            status: !openDropDown.status,
                          })
                        }
                      >
                        <span className="text-sm text-white">
                          {values.status || "Status"}
                        </span>
                        <img
                          src="/icons/Arrow Down.svg"
                          alt="arrow"
                          className={`transition ${
                            openDropDown.status ? "rotate-180" : "rotate-0"
                          }`}
                        />
                      </div>
                    </DropDownModalWrapper.Title>
                    <DropDownModalWrapper.TypeTwo />
                  </DropDownModalWrapper>
                </div>
              </div>

              {/* start and end date  */}
              <div className="w-full flex items-center justify-between gap-[60px]">
                <div className="w-full relative">
                  <input
                    name="start_date"
                    type="date"
                    placeholder="End Date"
                    value={values.start_date}
                    onChange={handleChange}
                    className="placeholder:text-white text-sm input-create p-2"
                  />
                </div>
                <div className="w-full relative">
                  <input
                    name="end_date"
                    type="date"
                    placeholder="End Date"
                    value={values.end_date}
                    onChange={handleChange}
                    className="placeholder:text-white text-sm input-create p-2"
                  />
                </div>
              </div>

              {/* Root Directory */}
              <div className="w-full flex items-center justify-between gap-[60px] ">
                <div className="w-full relative">
                  <input
                    name="root_dir"
                    value={values.root_dir}
                    onChange={handleChange}
                    type="text"
                    placeholder="Root Directory"
                    className="placeholder:text-white text-sm input-create p-2"
                  />
                  {errors.root_dir && touched.root_dir && (
                    <p className="absolute top-0 right-0 text-red-500 text-sm">
                      {errors.root_dir}
                    </p>
                  )}
                </div>
              </div>
              {/* members  */}
              {/* <div className="w-full flex items-center justify-between gap-[60px] ">
                <div className="w-full relative z-[1000]">
                  <DropDownModalWrapper
                    openDropDown={openDropDown?.members}
                    closeDropDown={setOpenDropDown}
                    items={formData.team || []}
                    setItems={setMembers}
                    selectedType={"members"}
                  >
                    <DropDownModalWrapper.Title>
                      <div
                        className="w-full h-full flex items-center justify-between gap-2 cursor-pointer border-b border-white/40  p-2"
                        onClick={() =>
                          setOpenDropDown({
                            ...openDropDown,
                            members: !openDropDown.members,
                          })
                        }
                      >
                        <span className="text-sm font-[300] text-white">
                          {formData.team.length > 0
                            ? `${
                                formData.team.length > 5
                                  ? formData.team
                                      .map((m) => "member" + m)
                                      .join(", ")
                                      .slice(0, 30) + "..."
                                  : formData.team
                                      .map((m) => "member" + m)
                                      .join(", ")
                              }`
                            : "Members"}
                        </span>
                        <img
                          className={`transition ${
                            openDropDown.members ? "rotate-180" : "rotate-0"
                          }`}
                          src="/icons/Arrow Down.svg"
                          alt=""
                        />
                      </div>
                    </DropDownModalWrapper.Title>
                    <DropDownModalWrapper.TypeTwo menuStyle="members" />
                  </DropDownModalWrapper>
                </div>
              </div> */}
              {/* Submit Button */}
              <div className="w-full flex items-center justify-end mt-auto">
                <CbuttonOne
                  type="submit"
                  disabled={createdProjectLoading || isSubmitting}
                  color="var(--primary-color-lower)"
                  height="h-[40px] min-w-[140px] font-bold w-full "
                >
                  <span>
                    {createdProjectLoading ? "Creating..." : "Create Project"}
                  </span>
                  {createdProjectLoading && <Loading size="w-6 h-6" />}
                </CbuttonOne>
              </div>
            </div>
          </form>
        )}
      </Formik>
      <ToastContainer />
    </div>
  );
};

export default CreateProjectForm;
