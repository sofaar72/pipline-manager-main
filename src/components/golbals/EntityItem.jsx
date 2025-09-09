import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useEpisodeManagerContext } from "../../assets/context/EpisodeManagerContext";
import CdropDown from "./CDropDown";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { assetChilds } from "../../fakeContents/AssetChilds";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { IoIosMore } from "react-icons/io";
import { useAssets } from "../../hooks/useAssets";

const EntityItem = ({ item, dataType }) => {
  const navigate = useNavigate();

  const [childs, setChilds] = useState("select child");

  const onChangeSelect = (e, option) => {
    setChilds(option?.name);
  };

  return (
    <NavLink
      className={`ent-item w-full radius !text-white h-[98px] flex gap-[15px] item-bg items-center px-[10px] py-[5px] cursor-pointer transition hover:!bg-[var(--primary-color-light)] 
        relative`}
      to={`/file-manager/${dataType}/${item.id}`}
      state={dataType === "assets" ? { item } : {}}
    >
      {/* ${
      isActive ? "!bg-[var(--primary-color-light)] " : "bg-transparent"
    } */}
      <div className="w-[80px] h-[80px] radius  relative shrink-0">
        <div className="w-full h-full blur-md absolute overflow-hidden">
          <div className="w-full h-full bg-[var(--primary-color-light)]"></div>
        </div>
        <img
          className="absolute z-10 w-full h-full object-cover radius "
          src={item.thumbnail || "/images/place-holder.svg"}
          alt=""
        />
      </div>
      {/* line  */}
      <div className="w-[1px] h-full bg-white/10 grow-0"></div>
      {/* text part  */}

      <div className="w-fit  h-full flex flex-col gap-2 grow-0 justify-between">
        <span className="text-sm">{item.name}</span>
        {/* <span className="text-xs">{item.version}</span> */}
        {dataType === "production" && (
          <>
            <span className="text-[10px]">Desc: {item.description}</span>
            <span className="text-[8px]">Project: {item.description}</span>
          </>
        )}
        {dataType === "assets" && (
          <div className="flex flex-col gap-1 w-full flex-1 shrink-0 ">
            <div className="flex items-center gap-1">
              <Menu as="div" className="relative inline-block text-left ">
                <div className="flex items-center gap-1">
                  <MenuButton
                    className="text-sm bg-[#7472C0] px-2 py-1 rounded-md flex items-center gap-1 transition hover:bg-[#7472C0]/80 cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                  >
                    <span className="text-[10px]">{childs}</span>
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="-mr-1 size-3 text-white"
                    />
                  </MenuButton>
                </div>
                <MenuItems className=" absolute left-0 z-20 mt-2 w-fit !min-w-20 origin-top-right rounded-md bg-primary shadow-lg ring-1 ring-black/5 text-white focus:outline-none flex flex-col ">
                  {item?.children?.length > 0 &&
                    item?.children?.map((option) => {
                      return (
                        <MenuItem key={option} as="button">
                          {({ active }) => (
                            <button
                              onClick={(e) => onChangeSelect(e, option)}
                              className={`block w-full text-left px-4 py-2 text-[10px] ${
                                active
                                  ? "bg-gray-100 text-gray-900"
                                  : "text-white"
                              }`}
                            >
                              {option?.name}
                            </button>
                          )}
                        </MenuItem>
                      );
                    })}
                </MenuItems>
              </Menu>
              <Menu as="div" className="relative inline-block text-left ">
                <MenuButton
                  className="text-sm bg-[#7472C0] px-2 py-1 rounded-md flex items-center gap-1 transition hover:bg-[#7472C0]/80 cursor-pointer"
                  // onClick={(e) => {
                  //   e.preventDefault();
                  //   e.stopPropagation();
                  // }}
                >
                  <IoIosMore />
                </MenuButton>
                <MenuItems className=" absolute left-0 z-20 mt-2 w-fit !min-w-20 origin-top-right rounded-md bg-primary shadow-lg ring-1 ring-black/5 text-white focus:outline-none flex flex-col ">
                  {assetChilds?.map((option) => (
                    <MenuItem key={option} as="button">
                      {({ active }) => (
                        <button
                          onClick={(e) => onChangeSelect(e, option)}
                          className={`block w-full text-left px-4 py-2 text-[10px] ${
                            active ? "bg-gray-100 text-gray-900" : "text-white"
                          }`}
                        >
                          {option}
                        </button>
                      )}
                    </MenuItem>
                  ))}
                </MenuItems>
              </Menu>
            </div>
            <div className=" flex items-center gap-1  justify-between w-full mt-auto">
              {/* <span className="text-[10px]">Desc: {item.description}</span> */}
              <span className="text-[8px]">Project: {item.description}</span>
            </div>
          </div>
        )}
      </div>
    </NavLink>
  );
};

export default EntityItem;
