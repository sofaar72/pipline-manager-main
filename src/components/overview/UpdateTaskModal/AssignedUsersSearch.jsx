import React from "react";
import TheSearch from "../TheSearch";
import { IoIosCloseCircle } from "react-icons/io";

const AssignedUsersSearch = ({
  setAssignee,
  assignee,
  filteredUsers,
  selectedUsers,
  selectUser,
  removeUser,
}) => {
  const searchAssignee = (e) => {
    setAssignee(e.target.value);
  };
  return (
    <div className="w-full flex flex-col gap-2">
      {/* top  */}
      <div className="h-regular w-full flex items-center gap-2 justify-between">
        <span>Assigneed Users</span>
        {/* comment for now  */}
        {/* <div className="flex items-center gap-2 h-sm">
          <button className="radius bg-[var(--overview-color-three)] text-white px-2 py-1">
            Select All
          </button>
          <button className="radius bg-[var(--overview-color-three)] text-white px-2 py-1">
            Clear All
          </button>
        </div> */}
      </div>

      {/* search  */}
      <TheSearch
        placeHolder="Search users to assigne.."
        onChange={searchAssignee}
        value={assignee}
        width="w-full"
        inHead={false}
      />
      {/* show the searched users  */}
      <div className="w-full flex flex-col gap-2">
        {filteredUsers.map((filteredUser, i) => {
          return (
            <div
              key={i}
              className="w-full flex gap-2 items-center cursor-pointer"
              onClick={() => selectUser(filteredUser)}
            >
              <img
                className="w-[40px] h-[40px] rounded-full border"
                src={
                  filteredUser.avatar ||
                  "https://www.svgrepo.com/show/508699/landscape-placeholder.svg"
                }
                alt=""
              />
              <span>{filteredUser.first_name}</span>
            </div>
          );
        })}
      </div>
      {/* selected items  */}
      {selectedUsers?.length > 0 && (
        <div className="w-full h-fit flex flex-col gap-2 items-start">
          <div className="h-lg">Selected Users</div>
          <div className="w-full grid grid-cols-2 gap-2 border border-t border-[var(--overview-color-four)]/50 radius p-2">
            {selectedUsers.map((selected, i) => {
              return (
                <div
                  key={i}
                  className="w-full flex gap-2 items-center cursor-pointer group relative"
                >
                  {/* close button */}
                  <span
                    className="text-lg absolute hidden group-hover:block right-[10px] top-1/2 -translate-y-1/2"
                    onClick={() => removeUser(selected)}
                  >
                    <IoIosCloseCircle />
                  </span>
                  <img
                    className="w-[40px] h-[40px] rounded-full border"
                    src={
                      selected.avatar ||
                      "https://www.svgrepo.com/show/508699/landscape-placeholder.svg"
                    }
                    alt=""
                  />
                  <span>{selected.first_name}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default AssignedUsersSearch;
