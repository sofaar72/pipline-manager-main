import React, { useEffect, useRef, useState } from "react";
import SearchOne from "./golbals/SearchOne";
import CbuttonOne from "./golbals/Buttons/CbuttonOne";
import { NavLink } from "react-router-dom";
import { useAuth } from "../assets/context/AuthContext";
// icons
import { FaHome } from "react-icons/fa";
import { AiFillProduct } from "react-icons/ai";
import { GrOverview } from "react-icons/gr";
import { FaTasks } from "react-icons/fa";
import { FaChartBar } from "react-icons/fa";
import { FaProjectDiagram } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import { FaRegUser } from "react-icons/fa";
import { GrDocumentConfig } from "react-icons/gr";
import { IoMdSettings } from "react-icons/io";
import { CiLogout } from "react-icons/ci";
import SidebarDropdown from "./SidebarDropdown";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [toggleTask, setToggleTask] = useState(false);

  const { logout } = useAuth();

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div
      className={` bg-blue-500 max-w-side h-screen flex gap-0 transition-all duration-200 relative ${
        isCollapsed ? "w-[68px]" : "w-[259px]"
      }`}
    >
      {/* side collapse  */}
      <div className="w-[68px] h-full bg-[#262437] flex flex-col items-center py-[75px] gap-[25px] px-[13px] absolute top-0 left-0 z-10 h-[121px]">
        {/* image part  */}
        <div className="w-full h-[121px] shrink-0 border-b border-white/20">
          <div className="w-[42px] h-[42px] overflow-hidden p-[2px] rounded-full bg-white ">
            <img
              className="w-full h-full"
              src="/images/sidebar-avatar.png"
              alt=""
            />
          </div>
        </div>
        {/* icons  */}

        <div className="w-full h-full  flex-1 flex flex-col items-center gap-[25px] text-white ">
          <NavLink
            className={
              "text-sm hover:text-[var(--primary-color-light)] transition w-[30px] h-[30px] flex items-center justify-center p-[3px] rounded-full"
            }
            to={"/dashboard"}
          >
            <FaHome className="w-full h-full" />
          </NavLink>
          <NavLink
            className={
              "text-sm hover:text-[var(--primary-color-light)] transition w-[30px] h-[30px] flex items-center justify-center p-[3px] rounded-full"
            }
            to={"/productivity"}
          >
            <AiFillProduct className="w-full h-full" />
          </NavLink>
          <NavLink
            className={
              "text-sm hover:text-[var(--primary-color-light)] transition w-[30px] h-[30px] flex items-center justify-center p-[3px] rounded-full"
            }
            to={"/overview"}
          >
            <GrOverview className="w-full h-full" />
          </NavLink>

          <div
            className="w-full h-full transition flex  justify-center"
            style={{
              maxHeight: "30px",
            }}
          >
            <NavLink
              className={
                "text-sm hover:text-[var(--primary-color-light)] transition w-[30px] h-[30px] flex items-center justify-center p-[3px] rounded-full "
              }
              to={"/task-manager/production"}
            >
              <FaTasks
                className="w-full h-full"
                style={{
                  height: "30px",
                }}
              />
            </NavLink>
          </div>
          <NavLink
            className={
              "text-sm hover:text-[var(--primary-color-light)] transition w-[30px] h-[30px] flex items-center justify-center p-[3px] rounded-full"
            }
            to={"/gun-chart"}
          >
            <FaChartBar className="w-full h-full" />
          </NavLink>
          <NavLink
            className={
              "text-sm hover:text-[var(--primary-color-light)] transition w-[30px] h-[30px] flex items-center justify-center p-[3px] rounded-full"
            }
            to={"/projects"}
          >
            <img className="w-full h-full" src="/icons/Pie Chart.svg" alt="" />
          </NavLink>
          <NavLink
            className={
              "text-sm hover:text-[var(--primary-color-light)] transition w-[30px] h-[30px] flex items-center justify-center p-[3px] rounded-full"
            }
            to={"/users"}
          >
            <FaUserGroup className="w-full h-full" />
          </NavLink>
          <NavLink
            className={
              "text-sm hover:text-[var(--primary-color-light)] transition w-[30px] h-[30px] flex items-center justify-center p-[3px] rounded-full"
            }
            to={"/user-profile"}
          >
            <FaRegUser className="w-full h-full" />
          </NavLink>
          <NavLink
            className={
              "text-sm hover:text-[var(--primary-color-light)] transition w-[30px] h-[30px] flex items-center justify-center p-[3px] rounded-full"
            }
            to={"/register-configs"}
          >
            <GrDocumentConfig className="w-full h-full" />
          </NavLink>
          <NavLink
            className={
              "text-sm hover:text-[var(--primary-color-light)] transition w-[30px] h-[30px] flex items-center justify-center p-[3px] rounded-full"
            }
            to={"/settings"}
          >
            <IoMdSettings className="w-full h-full" />
          </NavLink>
        </div>
      </div>
      <div
        className={`w-[191px] h-full p-[14px]   py-[75px]  flex flex-col gap-[25px] bg-side  right-0 absolute z- transition-all duration-200 border-l border-white/20`}
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
        <div className="w-full  h-[121px]  text-white flex flex-col gap-y-[10px] justify-between border-b border-white/50">
          <div className="w-full flex">
            <div className="w-full h-full flex flex-col gap-y-[10px]">
              <span className="text-sm font-[400]">Soheil Farrokhi</span>
              <span className="text-xs font-[300]">Developer</span>
            </div>
            <NavLink
              className={
                "!text-white hover:!text-[var(--primary-color-light)] text-sm transition"
              }
              onClick={logout}
            >
              <div className="w-[25px] h-[25px] flex items-center justify-center">
                <CiLogout className="w-full h-full" />
              </div>
            </NavLink>
          </div>
          {/* <div className="w-full h-full flex flex-col gap-y-[10px]">
            <SearchOne />
            <CbuttonOne>Add Project</CbuttonOne>
          </div> */}
        </div>
        {/* bottom part  */}
        <div className="w-full h-full  flex-1 flex flex-col  text-white ">
          <div className="w-full  flex flex-col gap-[25px]">
            <NavLink
              className={
                "text-sm hover:text-[var(--primary-color-light)] transition h-[30px] flex items-center  p-[3px] rounded-full"
              }
              to={"/dashboard"}
            >
              Dashboard
            </NavLink>
            <NavLink
              className={
                "text-sm hover:text-[var(--primary-color-light)] transition h-[30px] flex items-center  p-[3px] rounded-full"
              }
              to={"/productivity"}
            >
              Productivity
            </NavLink>
            <NavLink
              className={
                "text-sm hover:text-[var(--primary-color-light)] transition h-[30px] flex items-center  p-[3px] rounded-full"
              }
              to={"/overview"}
            >
              Overview
            </NavLink>
            <SidebarDropdown
              label="Task Manager"
              links={[
                { label: "Production", to: "/task-manager/production" },
                { label: "Assets", to: "/task-manager/assets" },
              ]}
            />
            <NavLink
              className={
                "text-sm hover:text-[var(--primary-color-light)] transition h-[30px] flex items-center  p-[3px] rounded-full"
              }
              to={"/gun-chart"}
            >
              Gun Chart
            </NavLink>
            <SidebarDropdown
              label="Projects"
              links={[
                { label: "Create Project", to: "/projects/create" },
                { label: "Select Project", to: "/projects/select" },
              ]}
            />

            <NavLink
              className={
                "text-sm hover:text-[var(--primary-color-light)] transition h-[30px] flex items-center  p-[3px] rounded-full"
              }
              to={"/users"}
            >
              Users
            </NavLink>
            <NavLink
              className={
                "text-sm hover:text-[var(--primary-color-light)] transition h-[30px] flex items-center  p-[3px] rounded-full"
              }
              to={"/user-profile"}
            >
              User Profile
            </NavLink>
            <NavLink
              className={
                "text-sm hover:text-[var(--primary-color-light)] transition h-[30px] flex items-center  p-[3px] rounded-full"
              }
              to={"/register-configs"}
            >
              Register Configs
            </NavLink>

            <NavLink
              className={
                "text-sm hover:text-[var(--primary-color-light)] transition h-[30px] flex items-center  p-[3px] rounded-full"
              }
              to={"/settings"}
            >
              Settings
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
