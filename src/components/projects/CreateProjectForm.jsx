import React, { useState } from "react";
import CbuttonOne from "../golbals/Buttons/CbuttonOne";
import { DropDownModalWrapper } from "../taskmanager/DropDownModalWrapper";

const CreateProjectForm = () => {
  const [openDropDown, setOpenDropDown] = useState({
    production: false,
    status: false,
    members: false,
  });
  const [productionType, setProductionType] = useState({});
  const [status, setStatus] = useState({});
  const [members, setMembers] = useState([]);
  return (
    <div className="w-full h-full flex items-center justify-center gap-4 bg-[var(--create-project-form-bg)] sec-padd overflow-hidden radius shrink-0">
      <form className="w-full h-full flex flex-col  sec-padd create-project-form-bg radius ">
        <div className="w-full  flex items-center justify-between gap-4 sec-padd">
          <h1 className="text-lg font-semibold">Create Project</h1>
          <CbuttonOne
            color="var(--primary-color-lower) "
            height="h-[40px] min-w-[140px] font-bold"
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
          <div className="w-full flex items-center justify-between gap-[60px]">
            <input
              type="text"
              placeholder="Project Name "
              className=" placeholder:text-white text-sm  input-create p-2"
            />
            <input
              type="text"
              placeholder="Project Code "
              className=" placeholder:text-white text-sm  input-create p-2"
            />
          </div>
          {/* Drop Downs  */}
          <div className="w-full flex items-center justify-between gap-[60px] ">
            <div className="w-full relative">
              <DropDownModalWrapper
                openDropDown={openDropDown?.production}
                closeDropDown={setOpenDropDown}
                items={[{ name: "Production" }, { name: "Post Production" }]}
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
                      {productionType.name
                        ? productionType?.name
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
            <div className="w-full relative">
              <DropDownModalWrapper
                openDropDown={openDropDown?.status}
                closeDropDown={setOpenDropDown}
                items={[
                  { name: "Done" },
                  { name: "Pending" },
                  { name: "In Progress" },
                ]}
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
                      {status.name ? status?.name : "Status"}
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
              type="text"
              placeholder="Root Directory "
              className=" placeholder:text-white text-sm  input-create p-2"
            />
          </div>
          {/* members  */}
          <div className="w-full flex items-center justify-between gap-[60px] ">
            <div className="w-full relative">
              <DropDownModalWrapper
                openDropDown={openDropDown?.members}
                closeDropDown={setOpenDropDown}
                items={[{ name: "member one" }, { name: "member two" }]}
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
                      {members.name ? members?.name : "Members"}
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
                <DropDownModalWrapper.TypeTwo />
              </DropDownModalWrapper>
            </div>
          </div>
          {/* button  */}
          <div className="w-full flex items-center justify-end mt-auto">
            <CbuttonOne
              color="var(--primary-color-lower) "
              height="h-[40px] min-w-[140px] font-bold w-full "
              type="submit"
            >
              Create Project
            </CbuttonOne>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateProjectForm;
