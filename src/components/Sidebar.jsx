import React, { useState } from "react";
import SearchOne from "./golbals/SearchOne";
import CbuttonOne from "./golbals/Buttons/CbuttonOne";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [toggleTask, setToggleTask] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const showTasks = () => {
    setToggleTask(!toggleTask);
  };

  return (
    <div
      className={` bg-blue-500 max-w-side h-screen flex gap-0 transition-all duration-200 relative ${
        isCollapsed ? "w-[68px]" : "w-[259px]"
      }`}
    >
      {/* side collapse  */}
      <div className="w-[68px] h-full bg-[#262437] flex flex-col items-center py-[75px] gap-[92px] px-[13px] absolute top-0 left-0 z-10">
        {/* image part  */}
        <div className="w-[42px] h-[42px] overflow-hidden p-[2px] rounded-full bg-white">
          <img
            className="w-full h-full"
            src="/images/sidebar-avatar.png"
            alt=""
          />
        </div>
        {/* icons  */}
        <div className="w-[18px] h-[192px] flex flex-col gap-[25px] mt-6">
          <NavLink
            className={
              "text-sm hover:text-[var(--primary-color-light)] transition"
            }
            to={"/"}
          >
            <img className="w-full h-full" src="/icons/Home Page.svg" alt="" />
          </NavLink>
          <NavLink
            className={
              "text-sm hover:text-[var(--primary-color-light)] transition"
            }
            to={"/task-manager"}
          >
            <img className="w-full h-full" src="/icons/To Do List.svg" alt="" />
          </NavLink>
          <NavLink
            className={
              "text-sm hover:text-[var(--primary-color-light)] transition"
            }
            to={"/task-manager"}
          >
            <img className="w-full h-full" src="/icons/Pie Chart.svg" alt="" />
          </NavLink>
          <NavLink
            className={
              "text-sm hover:text-[var(--primary-color-light)] transition"
            }
            to={"/task-manager"}
          >
            <img className="w-full h-full" src="/icons/Settings.svg" alt="" />
          </NavLink>
        </div>
      </div>
      <div
        className={`w-[191px] h-full p-[14px] py-0  py-[75px] pb-[58px] flex flex-col gap-[32px] bg-side  right-0 absolute z- transition-all duration-200 `}
      >
        {/* collapse icon  */}
        <div
          className={`w-[24px] h-[24px] absolute -right-[40px] top-[14px] cursor-pointer transition-2 ${
            isCollapsed ? "rotate-180" : "rotate-0"
          }`}
          onClick={toggleCollapse}
        >
          <img className="w-full h-full" src="/icons/Outdent.svg" alt="" />
        </div>
        {/* top part  */}
        <div className="w-full  text-white flex flex-col gap-y-[10px] justify-between ">
          <span className="text-sm font-[400]">Soheil Farrokhi</span>
          <span className="text-xs font-[300]">Developer</span>
          <SearchOne />
          <CbuttonOne>Add Project</CbuttonOne>
        </div>
        {/* bottom part  */}
        <div className="w-full  flex-1 flex flex-col justify-between text-white">
          <div className="w-full h-[191px] flex flex-col gap-[25px]">
            <NavLink
              className={
                "text-sm hover:text-[var(--primary-color-light)] transition"
              }
              to={"/"}
            >
              Dashboard
            </NavLink>
            <div
              className={
                "text-sm hover:text-[var(--primary-color-light)] transition relative cursor-pointer"
              }
              onClick={showTasks}
            >
              <span>Task Manager</span>
              <div
                className={`relative px-2 py-4 flex gap-2 overflow-hidden transition-all duration-500 ease-in-out  ${
                  toggleTask
                    ? "max-h-40 opacity-100 scale-100"
                    : "max-h-0 opacity-0 scale-95"
                }`}
              >
                <img
                  className="w-[15px] h-[44px]"
                  src="/images/lines.png"
                  alt=""
                />
                <div className="flex-1 flex flex-col gap-2">
                  <NavLink
                    className={
                      "text-white hover:text-[var(--primary-color-light)]"
                    }
                    to="/task-manager/production"
                  >
                    Production
                  </NavLink>
                  <NavLink
                    className={
                      "text-white hover:text-[var(--primary-color-light)]"
                    }
                    to="/task-manager/assets"
                  >
                    Assets
                  </NavLink>
                </div>
              </div>
            </div>

            <NavLink
              className={
                "text-sm hover:text-[var(--primary-color-light)] transition"
              }
              to={"/reports"}
            >
              Reports
            </NavLink>
            <NavLink
              className={
                "text-sm hover:text-[var(--primary-color-light)] transition"
              }
              to={"/settings"}
            >
              Settings
            </NavLink>
          </div>
          <div className="w-full mt-auto">
            <NavLink
              className={
                "text-sm hover:text-[var(--primary-color-light)] transition"
              }
              to={"/Support"}
            >
              Help & Support
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
