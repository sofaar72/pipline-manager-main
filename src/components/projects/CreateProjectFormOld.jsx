import React, { useState, useRef, useEffect } from "react";
import CbuttonOne from "../golbals/Buttons/CbuttonOne";
import { DropDownModalWrapper } from "../taskmanager/DropDownModalWrapper";
import { FaPen, FaPlus } from "react-icons/fa";
import { useProject } from "../../hooks/useProject";
import Loading from "../golbals/Loading";
import TeamSelectComp from "./TeamSelectComp";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

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
  const [openDropDown, setOpenDropDown] = useState({
    production: false,
    status: false,
    members: false,
  });

  const {
    createTheProject,
    createdProjectData,
    createdProjectSuccess,
    createdProjectMessage,
    createdProjectLoading,
    createdProjectError,
  } = useProject();

  const navigate = useNavigate();
  const [avatarPreview, setAvatarPreview] = useState(null);
  const avatarRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    code: "",
    production_type: "FILM",
    status: "",
    root_dir: "",
    team: [],
    avatar: null,
    // start_date: "",
    // end_date: "",
  });

  const uploadAvatar = (e) => {
    const file = e.target.files[0];
    if (file) {
      // const reader = new FileReader();
      // reader.onload = (e) => {
      //   setAvatar(e.target.result);
      // };
      const imageURL = URL.createObjectURL(file);
      setFormData({ ...formData, avatar: file });
      setAvatarPreview(imageURL);
    }
  };

  const handleUploadAvatar = () => {
    avatarRef.current.click();
  };

  const submitForm = (e) => {
    e.preventDefault();
    const sendFormData = new FormData();
    sendFormData.append("avatar", formData.avatar);
    sendFormData.append("name", formData.name);
    sendFormData.append("code", formData.code);
    sendFormData.append("production_type", formData.production_type);
    sendFormData.append("status", formData.status);
    sendFormData.append("root_dir", formData.root_dir);
    // sendFormData.append("team", formData.team);
    createTheProject({ ...formData });
  };

  const setProductionType = (type) => {
    setFormData({ ...formData, production_type: type.name });
  };
  const setStatus = (type) => {
    setFormData({ ...formData, status: type.name });
  };
  const setMembers = (item, checked) => {
    if (checked) {
      setFormData({ ...formData, team: [...formData?.team, item] });
    } else {
      const newMembers = formData?.team?.filter((m) => m !== item);
      setFormData({ ...formData, team: newMembers });
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigateToProject = () => {
    navigate(`/projects/select`);
  };

  return (
    <div className="w-full h-full flex items-center justify-center gap-4 bg-[var(--create-project-form-bg)] sec-padd overflow-hidden radius shrink-0">
      <form
        className="w-full h-full flex flex-col  sec-padd create-project-form-bg radius "
        onSubmit={submitForm}
      >
        <div className="w-full  flex items-center justify-between gap-4 sec-padd">
          <h1 className="text-lg font-semibold">Create Project</h1>
          <CbuttonOne
            color="var(--primary-color-lower) "
            height="h-[40px] min-w-[140px] font-bold"
            onClick={navigateToProject}
          >
            Select Project
          </CbuttonOne>
        </div>
        {/* paragraph  */}
        <p className="text-sm sec-padd">
          Create a new project to start working on your tasks.
        </p>
        {/* form  */}
        <div className="w-full h-full flex flex-col gap-4 create-innerofrom sec-padd radius">
          {/* add avatar  */}
          {/* <div className="w-full flex items-center justify-between gap-[60px]">
            <div
              className="w-[100px] h-[100px] rounded-full flex items-center justify-center bg-white/10 relative cursor-pointer"
              onClick={handleUploadAvatar}
            >
              {avatarPreview ? (
                <div className="absolute w-full h-full  flex items-center justify-center bg-white/10  cursor-pointer rounded-full">
                  <img
                    src={avatarPreview}
                    alt=""
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              ) : (
                <FaPlus className="text-white text-2xl" />
              )}
              <div className="absolute bottom-0 right-0 w-[30px] h-[30px] bg-white rounded-full flex items-center justify-center">
                <FaPen className="text-black text-sm" />
                <input
                  type="file"
                  className="hidden"
                  ref={avatarRef}
                  name="avatar"
                  onChange={(e) => uploadAvatar(e)}
                />
              </div>
              <input type="file" className="hidden" />
            </div>
          </div> */}
          {/* project name and code  */}
          <div className="w-full flex items-center justify-between gap-[60px]">
            <input
              name="name"
              type="text"
              placeholder="Project Name "
              onChange={handleChange}
              value={formData.name}
              className=" placeholder:text-white text-sm  input-create p-2"
            />
            <input
              name="code"
              type="text"
              placeholder="Project Code "
              onChange={handleChange}
              value={formData.code}
              className=" placeholder:text-white text-sm  input-create p-2"
            />
          </div>
          {/* Drop Downs  */}
          <div className="w-full flex items-center justify-between gap-[60px] ">
            {/* Production type */}
            <div className="w-full relative">
              <DropDownModalWrapper
                openDropDown={openDropDown?.production}
                closeDropDown={setOpenDropDown}
                items={productionTypes}
                setItems={setProductionType}
                selectedType={"production"}
              >
                <DropDownModalWrapper.Title>
                  <div
                    className="w-full h-full flex items-center justify-between gap-2 cursor-pointer border-b border-white/40  p-2"
                    onClick={() =>
                      setOpenDropDown({
                        ...openDropDown,
                        production: !openDropDown.production,
                      })
                    }
                  >
                    <span className="text-sm font-[300] text-white">
                      {formData.production_type
                        ? formData.production_type
                        : "Production type"}
                    </span>
                    <img
                      className={`transition ${
                        openDropDown.production ? "rotate-180" : "rotate-0"
                      }`}
                      src="/icons/Arrow Down.svg"
                      alt=""
                    />
                  </div>
                </DropDownModalWrapper.Title>
                <DropDownModalWrapper.TypeTwo />
              </DropDownModalWrapper>
            </div>
            {/* Status */}
            <div className="w-full relative z-[2000]">
              <DropDownModalWrapper
                openDropDown={openDropDown?.status}
                closeDropDown={setOpenDropDown}
                items={statuses}
                setItems={setStatus}
                selectedType={"status"}
              >
                <DropDownModalWrapper.Title>
                  <div
                    className="w-full h-full flex items-center justify-between gap-2 cursor-pointer border-b border-white/40  p-2"
                    onClick={() =>
                      setOpenDropDown({
                        ...openDropDown,
                        status: !openDropDown.status,
                      })
                    }
                  >
                    <span className="text-sm font-[300] text-white">
                      {formData.status ? formData.status : "Status"}
                    </span>
                    <img
                      className={`transition ${
                        openDropDown.status ? "rotate-180" : "rotate-0"
                      }`}
                      src="/icons/Arrow Down.svg"
                      alt=""
                    />
                  </div>
                </DropDownModalWrapper.Title>
                <DropDownModalWrapper.TypeTwo />
              </DropDownModalWrapper>
            </div>
          </div>
          {/* root directory  */}
          <div className="w-full flex items-center justify-between gap-[60px]">
            <input
              name="root_dir"
              onChange={handleChange}
              value={formData.root_dir}
              type="text"
              placeholder="Root Directory "
              className=" placeholder:text-white text-sm  input-create p-2"
            />
          </div>
          {/* members  */}
          <div className="w-full flex items-center justify-between gap-[60px] ">
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
                      {formData?.team?.length > 0
                        ? `${
                            formData?.team?.length > 5
                              ? formData?.team
                                  .map((m) => "member" + m)
                                  .join(", ")
                                  .slice(0, 30) + "..."
                              : formData?.team
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
          </div>
          {/* button  */}
          <div className="w-full flex items-center justify-end mt-auto">
            <CbuttonOne
              color="var(--primary-color-lower) "
              height="h-[40px] min-w-[140px] font-bold w-full"
              type="submit"
              disabled={createdProjectLoading}
            >
              <span>
                {createdProjectLoading ? "Creating..." : "Create Project"}
              </span>
              {createdProjectLoading && <Loading size="w-6 h-6" />}
            </CbuttonOne>
          </div>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default CreateProjectForm;
