import React, { useEffect } from "react";
// import CbuttonOne from "../golbals/Buttons/CbuttonOne";
// import { MdViewComfy } from "react-icons/md";
import { motion } from "framer-motion";
import UsersDataTable from "./UsersDataTable";
import { containerVariants } from "../../animation/animation";
import CdropDown from "../golbals/CDropDown";
import { MdOutlineSort, MdViewComfy } from "react-icons/md";
import CbuttonOne from "../golbals/Buttons/CbuttonOne";
import { FaPlus } from "react-icons/fa";
import GlobalModal from "../golbals/GlobalModal";
import RegisterFrom from "../login/RegisterFrom";
import AddUserForm from "./AddUserFrom";
import { useUser } from "../../hooks/useUser";

const UsersList = () => {
  const { getUsers, userResults, userLoading, userErrors } = useUser();
  useEffect(() => {
    getUsers();
  }, []);
  // useEffect(() => {
  //   console.log(userResults);
  // }, [userResults]);

  return (
    <div className="w-full h-full flex flex-col gap-4">
      {/* header part */}

      {/* users part  */}
      <div className="w-full flex-1 shrink-0 h-full flex flex-col gap-4 radius bg-[var(--select-project-bg)] p-4 ">
        {/* projects header  */}
        <div className="w-full h-[50px] bg-[var(--select-project-header)] radius p-4 flex items-center justify-between">
          <div className="w-full h-full flex items-center gap-2">
            <span className="text-[15px] font-semibold text-white">
              All Users in the List
            </span>
          </div>
          <div className=" h-full flex items-center gap-2">
            {/* tool icons  */}
            <span className="text-[12px] font-normal text-white hover:bg-white/10 radius p-2 cursor-pointer">
              {/* <MdViewComfy className="text-[20px] text-white " /> */}
            </span>

            {/* <CdropDown
              options={viewTypeOptions}
              select={selectViewType}
              init="Grid"
              type="typeTwo"
              icon={<MdOutlineSort className="text-[20px] text-white" />}
            /> */}
          </div>
        </div>
        {/* scrollable projects  */}
        <div
          className={`w-full h-full grow-[670px] flex-1 shrink-0 overflow-hidden bg-[var(--select-project-header)] radius p-4 flex flex-col gap-4`}
        >
          <div className="w-full flex items-center justify-between gap-2 text-white">
            <div className="w-fit p-2 flex items-center gap-2 bg-[var(--primary-color-light)]/50 radius h-[40px]">
              <span className="text-[12px] font-semibold">Total Users : </span>
              <span className="text-[10px] font-[200]">user number</span>
            </div>
            <div className=" h-full flex items-center gap-2">
              {/* tool icons  */}
              <span className="text-[12px] font-normal text-white hover:bg-white/10 radius p-2 cursor-pointer">
                <MdViewComfy className="text-[20px] text-white " />
              </span>
              <span className="text-[12px] font-normal text-white hover:bg-white/10 radius p-2 cursor-pointer">
                <MdOutlineSort className="text-[20px] text-white" />
              </span>
              {/* <CdropDown
                options={viewTypeOptions}
                select={selectViewType}
                init="Grid"
                type="typeTwo"
                icon={<MdOutlineSort className="text-[20px] text-white" />}
              /> */}

              {/* /* create project Button  */}

              {/* add user modal  */}
              <GlobalModal
                text=""
                clickButton={(openModal) => {
                  return (
                    <CbuttonOne
                      title="Add User"
                      onClick={() => {
                        //  open create user modal
                        openModal(true);
                      }}
                      cClasses="bg-[var(--primary-color-light)] w-[100px] hover:!bg-[var(--primary-color-light)]/80"
                      height="h-[40px]"
                    >
                      <span className="text-[12px] font-semibold text-white">
                        Add User
                      </span>
                      <FaPlus />
                    </CbuttonOne>
                  );
                }}
                modalContent={(openModal) => {
                  return (
                    <div
                      className="w-full h-full max-w-[400px] text-white"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <AddUserForm openModal={openModal} />
                    </div>
                  );
                }}
              ></GlobalModal>
            </div>
          </div>
          <motion.div
            // variants={containerVariants}
            // initial="hidden"
            // animate="show"
            className="w-full h-full"
          >
            <UsersDataTable loading={userLoading} items={userResults} />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default UsersList;
