import React from "react";
import ProgressLinear from "../golbals/ProgressLinear";
import { FaCheck } from "react-icons/fa";
import { ProgressCircular } from "../golbals/ProgressCircular";
import { useNavigate } from "react-router-dom";

const ProjectItemTwo = ({ project, selectProject, selectedProject }) => {
  const navigate = useNavigate();

  const handleSelectProject = (item) => {
    selectProject(item);
    // navigate("/task-manager/production");
    navigate("/overview");
  };

  // console.log(selectedProject.id, project.id);
  return (
    <div
      className={` radius p-4 shrink-0 relative ${
        selectedProject?.id == project?.id
          ? "bg-[var(--primary-color-light)] min-h-[222px]"
          : "project-item-two radius p-4"
      }`}
      onClick={() => handleSelectProject(project)}
    >
      {/* checkbox select part  */}
      {/* <div className="absolute top-4 right-4">
        <FaCheck className="text-white text-[20px]" />
      </div> */}
      {/* content part  */}
      <div className="w-full h-full flex flex-col justify-between gap-4">
        {/* image and content part  */}
        <div className=" w-full h-fit min-h-[90px] flex justify-between gap-4">
          {/* image part  */}
          <div className="w-[93px] h-[93px] radius bg-white/10 flex items-center justify-center overflow-hidden shrink-0 border-2 border-[var(--progress-linear-color-three)]">
            <img
              src="https://images.unsplash.com/photo-1579353977828-2a4eab540b9a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2FtcGxlfGVufDB8fDB8fHww"
              alt="project"
              className="w-full h-full object-cover shrink-0"
            />
          </div>
          {/* project info  */}
          <div className="w-full h-full flex flex-col gap-4 justify-between max-w-[250px]">
            <h3 className="text-white text-[10px] font-semibold">
              {project?.name ? project.name : "Project Name"}
            </h3>
            <div className="w-full h-full flex items-center flex flex-col gap-1">
              <div className="w-full h-full flex items-center justify-between gap-2">
                <span className="text-[9px]">Production Type</span>
                <span className="text-[8px]">
                  {project?.production_type ? project?.production_type : "Type"}
                </span>
              </div>
              <div className="w-full h-full flex items-center justify-between gap-2">
                <span className="text-[9px]">Start Date</span>
                <span className="text-[8px]">
                  {project?.start_date ? project?.start_date : "Start Date"}
                </span>
              </div>
              <div className="w-full h-full flex items-center justify-between gap-2">
                <span className="text-[9px]">End Date</span>
                <span className="text-[8px]">
                  {project?.end_date ? project?.end_date : "End Date"}
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* progress part  */}
        <div className="w-full flex gap-2 justify-between ">
          <div className="w-fit h-full flex items-center justify-center">
            <ProgressCircular
              duration={3000}
              target={100}
              size={70}
              // circleColor="var(--progress-linear-color-one)"
              progressColor="var(--progress-linear-color-one)"
              strokeWidth={10}
            />
          </div>
          <div className="w-[150px] h-full flex items-center  gap-2 flex-col ">
            <ProgressLinear
              color="var(--progress-linear-color-two)"
              height={6}
            />
            <ProgressLinear
              color="var(--progress-linear-color-three)"
              height={6}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectItemTwo;
