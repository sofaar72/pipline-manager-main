import React, { useState } from "react";
import ProgressLinear from "../golbals/ProgressLinear";
import { FaCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProjectItemOne = ({ project, selectProject, selectedProject }) => {
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();
  const handleCheck = (item) => {
    // setIsChecked(!isChecked);
    selectProject(item);
    navigate("/task-manager/production");
  };
  const projectData = useSelector((state) => state.project);

  console.log("test");

  return (
    <div
      className={` shrink-0 relative ${
        selectedProject?.id === project?.id
          ? "bg-[var(--primary-color-light)]"
          : "project-item-one radius p-4"
      }`}
      onClick={() => handleCheck(project)}
    >
      {/* checkbox select part  */}
      {/* <div className="absolute top-4 right-4">
        <FaCheck className="text-white text-[30px]" />
      </div> */}
      <div className="w-full h-full flex justify-between gap-4">
        <div className=" h-full flex justify-between gap-4">
          {/* image part  */}
          <div className="w-[120px] h-[120px] radius bg-white/10 flex items-center justify-center overflow-hidden shrink-0 border-2 border-[var(--progress-linear-color-one)]">
            <img
              src="https://images.unsplash.com/photo-1579353977828-2a4eab540b9a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2FtcGxlfGVufDB8fDB8fHww"
              alt="project"
              className="w-full h-full object-cover shrink-0"
            />
          </div>
          {/* project info  */}
          <div className="w-full h-full flex flex-col gap-4 justify-between max-w-[250px]">
            <h3 className="text-white text-[15px] font-semibold">
              {project?.name ? project.name : "Project Name"}
            </h3>
            <div className="w-full h-full flex items-center flex flex-col gap-1">
              <div className="w-full h-full flex items-center justify-between gap-2">
                <span className="text-[14px]">Production Type</span>
                <span className="text-[13px]">
                  {project?.production_type ? project?.production_type : "Type"}
                </span>
              </div>
              <div className="w-full h-full flex items-center justify-between gap-2">
                <span className="text-[14px]">Start date</span>

                <span className="text-[13px]">
                  {project?.start_date ? project?.start_date : "Start Date"}
                </span>
              </div>
              <div className="w-full h-full flex items-center justify-between gap-2">
                <span className="text-[14px]">End Date</span>
                <span className="text-[13px]">
                  {" "}
                  {project?.end_date ? project?.end_date : "End Date"}
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* progress part  */}
        <div className="w-full h-full flex items-center justify-between gap-2 flex-col max-w-[400px] pr-[100px] ">
          <ProgressLinear color="var(--progress-linear-color-one)" />
          <ProgressLinear color="var(--progress-linear-color-two)" />
          <ProgressLinear color="var(--progress-linear-color-three)" />
        </div>
      </div>
    </div>
  );
};

export default ProjectItemOne;
