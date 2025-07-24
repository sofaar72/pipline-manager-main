import React, { useState } from "react";
import SearchOne from "./golbals/SearchOne";
import CbuttonOne from "./golbals/Buttons/CbuttonOne";
import { NavLink } from "react-router-dom";
import { useAuth } from "../assets/context/AuthContext";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [toggleTask, setToggleTask] = useState(false);
  const { logout } = useAuth();

  const toggleCollapse = () => setIsCollapsed(!isCollapsed);
  const showTasks = () => setToggleTask(!toggleTask);

  return (
    <div
      className={`bg-blue-500 max-w-side h-screen flex gap-0 transition-all duration-200 relative ${
        isCollapsed ? "w-[68px]" : "w-[259px]"
      }`}
    >
      {/* Collapsed Sidebar */}
      <div className="w-[68px] h-full bg-[#262437] flex flex-col items-center py-[75px] gap-[92px] px-[13px] absolute top-0 left-0 z-10">
        <div className="w-[42px] h-[42px] overflow-hidden p-[2px] rounded-full bg-white">
          <img
            className="w-full h-full"
            src="/images/sidebar-avatar.png"
            alt=""
          />
        </div>
        <div className="w-[18px] h-[192px] flex flex-col gap-[25px] mt-6">
          <NavLink to="/" className="hover:text-primary transition">
            <img src="/icons/Home Page.svg" alt="" />
          </NavLink>
          <NavLink to="/dashboard">
            <img src="/icons/Pie Chart.svg" alt="" />
          </NavLink>
          <NavLink to="/settings">
            <img src="/icons/Settings.svg" alt="" />
          </NavLink>
        </div>
      </div>

      {/* Expanded Sidebar */}
      <div className="w-[191px] h-full p-[14px] pt-[75px] pb-[58px] flex flex-col gap-[32px] bg-side right-0 absolute z-20 transition-all duration-200">
        {/* Collapse Icon */}
        <div
          className={`w-[24px] h-[24px] absolute -right-[40px] top-[14px] cursor-pointer ${
            isCollapsed ? "rotate-180" : "rotate-0"
          }`}
          onClick={toggleCollapse}
        >
          <img src="/icons/Outdent.svg" alt="" />
        </div>

        {/* User Info + Actions */}
        <div className="text-white flex flex-col gap-y-[10px]">
          <span className="text-sm font-medium">Soheil Farrokhi</span>
          <span className="text-xs font-light">Developer</span>
          <SearchOne />
          <CbuttonOne>Add Project</CbuttonOne>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 flex flex-col justify-between text-white">
          <div className="flex flex-col gap-[20px]">
            {/* <NavLink to="/" className="hover:text-primary text-sm">
              Home
            </NavLink> */}
            <NavLink to="/dashboard" className="hover:text-primary text-sm">
              Dashboard
            </NavLink>
            <NavLink to="/overview" className="hover:text-primary text-sm">
              Overview
            </NavLink>
            <NavLink to="/gun-chart" className="hover:text-primary text-sm">
              Gun Chart
            </NavLink>
            <NavLink to="/productivity" className="hover:text-primary text-sm">
              Productivity
            </NavLink>
            <NavLink to="/projects" className="hover:text-primary text-sm">
              Projects
            </NavLink>
            <NavLink to="/users" className="hover:text-primary text-sm">
              Users
            </NavLink>
            <NavLink
              to="/register-configs"
              className="hover:text-primary text-sm"
            >
              Register Configs
            </NavLink>
            <NavLink to="/settings" className="hover:text-primary text-sm">
              Settings
            </NavLink>
            <NavLink to="/user-profile" className="hover:text-primary text-sm">
              Profile
            </NavLink>

            {/* Task Manager Dropdown */}
            <div
              className="text-sm cursor-pointer hover:text-primary transition relative"
              onClick={showTasks}
            >
              Task Manager
              <div
                className={`transition-all duration-500 overflow-hidden ${
                  toggleTask ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-2 py-2 flex gap-2">
                  <img
                    className="w-[15px] h-[44px]"
                    src="/images/lines.png"
                    alt=""
                  />
                  <div className="flex flex-col gap-2">
                    <NavLink
                      to="/task-manager/production"
                      className="hover:text-primary"
                    >
                      Production
                    </NavLink>
                    <NavLink
                      to="/task-manager/assets"
                      className="hover:text-primary"
                    >
                      Assets
                    </NavLink>
                    <NavLink
                      to="/task-manager/preview"
                      className="hover:text-primary"
                    >
                      Preview
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Logout */}
          <div className="mt-auto">
            <span
              className="text-sm cursor-pointer hover:text-primary"
              onClick={logout}
            >
              Log out
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
