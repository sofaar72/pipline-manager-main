import React, { useEffect, useState } from "react";
// import CbuttonOne from "../golbals/CbuttonOne";
import Loading from "../golbals/Loading";
import ProjectItemOne from "./ProjectItemOne";
import ProjectItemTwo from "./ProjectItemTwo";
import { FaPlus } from "react-icons/fa";
import CbuttonOne from "../golbals/Buttons/CbuttonOne";
import { useNavigate } from "react-router-dom";
import { MdOutlineSort } from "react-icons/md";
import { MdViewComfy } from "react-icons/md";
import CdropDown from "../golbals/CDropDown";
import { useProject } from "../../hooks/useProject";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "../../animation/animation";
import { selectProject } from "../../store/Slices/ProjectsSlice";
import { useDispatch, useSelector } from "react-redux";

const SelectProjectContents = () => {
  const dispatch = useDispatch();
  const [viewType, setViewType] = useState("Grid");
  const {
    getAllProjects,
    projectsData,
    projectsSuccess,
    projectsMessage,
    projectsLoading,
    projectsError,
  } = useProject();
  const { selectedProject } = useSelector((state) => state.project);

  const viewTypeOptions = [
    {
      id: 1,
      name: "Grid",
    },
    {
      id: 2,
      name: "List",
    },
  ];

  const selectViewType = (type) => {
    setViewType(type.name);
  };

  useEffect(() => {
    getAllProjects({ page: 1, page_size: 10 });
  }, []);

  useEffect(() => {
    console.log(projectsData);
  }, [projectsData]);

  const selectProjectItem = (proj) => {
    dispatch(selectProject(proj));
  };

  const navigate = useNavigate();

  const goToFileManager = () => {
    navigate("/task-manager/production/");
  };

  return (
    <div className="w-full h-full flex flex-col gap-4">
      {/* header part */}
      <div className="w-full h-[80px] flex items-center justify-between bg-[var(--select-project-bg)] radius p-4 radius">
        <h1 className="text-[15px] font-semibold text-white">
          Select From Projects List
        </h1>

        <div className=" h-full flex items-center gap-2">
          <CbuttonOne
            title="Projects File Manager"
            onClick={goToFileManager}
            cClasses="bg-[var(--primary-color-light)] w-[150px] hover:!bg-[var(--primary-color-light)]/80"
            height="h-[40px]"
          >
            <span className="text-[12px] font-semibold text-white">
              File Manager
            </span>
          </CbuttonOne>

          {/* /* create project Button  */}
          <CbuttonOne
            title="Create Project"
            onClick={() => {
              navigate("/projects/create");
            }}
            cClasses="bg-[var(--primary-color-light)] w-[150px] hover:!bg-[var(--primary-color-light)]/80"
            height="h-[40px]"
          >
            <span className="text-[12px] font-semibold text-white">
              Create Project
            </span>
            <FaPlus />
          </CbuttonOne>
        </div>
      </div>

      {/* projects part  */}
      <div className="w-full flex-1 shrink-0 h-full flex flex-col gap-4 radius bg-[var(--select-project-bg)] p-4 ">
        {/* projects header  */}
        <div className="w-full h-[50px] bg-[var(--select-project-header)] radius p-4 flex items-center justify-between">
          <div className="w-full h-full flex items-center gap-2">
            <span className="text-[12px] font-normal text-white">
              Total Projects:
            </span>
            <span className="text-[12px] font-normal text-white">100</span>
          </div>
          <div className=" h-full flex items-center gap-2">
            {/* tool icons  */}
            <span className="text-[12px] font-normal text-white hover:bg-white/10 radius p-2 cursor-pointer">
              <MdViewComfy className="text-[20px] text-white " />
            </span>

            <CdropDown
              options={viewTypeOptions}
              select={selectViewType}
              init="Grid"
              type="typeTwo"
              icon={<MdOutlineSort className="text-[20px] text-white" />}
            />
          </div>
        </div>
        {/* scrollable projects  */}
        <div
          className={`w-full h-full grow-[670px] flex-1 shrink-0 overflow-hidden bg-[var(--select-project-header)] radius p-4`}
        >
          <motion.div
            key={viewType} // 🔥 This triggers animation on Grid/List switch
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className={`w-full h-[690px] transition flex-col gap-4 overflow-y-auto ${
              viewType === "List" ? "flex" : "grid grid-cols-3 gap-4"
            }`}
          >
            {projectsData?.map((project) => {
              return (
                <motion.div
                  key={project.id}
                  variants={itemVariants}
                  className="w-full h-full"
                >
                  {viewType === "List" ? (
                    <ProjectItemOne
                      project={project}
                      selectProject={selectProjectItem}
                      selectedProject={selectedProject}
                    />
                  ) : (
                    <ProjectItemTwo
                      project={project}
                      selectProject={selectProjectItem}
                      selectedProject={selectedProject}
                    />
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SelectProjectContents;
