import React, { useEffect, createContext, useContext, useState } from "react";
import TasksIcon from "../golbals/CustomIcons.jsx/TasksIcon";

const DropDownContext = createContext();

export const DropDownModalWrapper = ({
  openDropDown,
  closeDropDown,
  items = [],
  setItems,
  selectedType,
  children,
}) => {
  return (
    <DropDownContext.Provider
      value={{
        openDropDown,
        closeDropDown,
        items,
        setItems,
        selectedType,
      }}
    >
      <div className="w-full">{children}</div>
    </DropDownContext.Provider>
  );
};

DropDownModalWrapper.Title = ({ children }) => {
  return (
    <div className="w-full flex items-center justify-between gap-2">
      {children}
    </div>
  );
};

DropDownModalWrapper.TypeTwo = () => {
  const { openDropDown, closeDropDown, items, setItems, selectedType } =
    useDropDown();

  const selectAction = (item) => {
    setItems({ id: item.id, name: item.name });
    closeDropDown((prev) => ({ ...prev, [selectedType]: false }));
  };

  return (
    <div
      className={`w-full overflow-hidden h-fit bg-[#28263E]/70 backdrop-blur-lg radius absolute left-0 top-[100%] transition px-4 py-4 z-[5000]  ${
        openDropDown ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    >
      <div className="w-full flex gap-0 flex-col h-[200px]">
        <div className="w-full h-full flex flex-col   gap-4 overflow-y-auto py-4">
          {items?.map((item, i) => {
            return (
              <div
                className={`capitalize w-full flex items-center justify-between gap-2 cursor-pointer border-b border-white/20  hover:bg-[var(--primary-color-light)]  transition ${
                  selectedType.id === item.id ? "" : ""
                }  p-2`}
                key={i}
                onClick={() => selectAction(item)}
              >
                <TasksIcon size={{ width: "16px", height: "16px" }} />
                <span>{item?.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

DropDownModalWrapper.TypeMembers = () => {
  const { openDropDown, closeDropDown, items, setItems, selectedType } =
    useDropDown();
  return <div>TypeMembers</div>;
};

const useDropDown = () => {
  const context = useContext(DropDownContext);
  if (!context)
    throw new Error("Dropdown compound components must be used within <Tabs>");
  return context;
};
