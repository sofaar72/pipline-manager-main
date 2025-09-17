import React from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import CbuttonTwo from "../golbals/Buttons/CbuttonTwo";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { IoMdClose } from "react-icons/io";

const TheDropDownForSearch = ({
  width,
  items = [],
  cClass = "",
  remove,
  children,
  funcAfterForSearch = () => {},
}) => {
  return (
    <Menu as="div" className="relative inline-block text-left shrink-0">
      <MenuButton
        as={CbuttonTwo}
        cClass={`${cClass} !h-[35px] bg-[var(--overview-color-two)] ${
          width ? width : "w-[150px]"
        } p-2 flex !justify-between`}
      >
        {children}
        <ChevronDownIcon
          aria-hidden="true"
          className="-mr-1 size-4 text-white"
        />
      </MenuButton>

      <MenuItems className="absolute z-[9999] left-0 mt-2 w-full !min-w-26 origin-top-right rounded-md bg-primary shadow-lg ring-1 ring-black/5 text-white focus:outline-none flex flex-col">
        {items.map((item) => (
          <MenuItem key={item.id}>
            {({ active }) => (
              <div className="flex w-full justify-between items-center gap-2">
                {/* select saved */}
                <button
                  className="block w-full text-left px-4 py-2 text-sm h-regular cursor-pointer"
                  onClick={() => funcAfterForSearch(item.name)}
                >
                  {item.name.length > 20
                    ? item.name.slice(0, 20) + "..."
                    : item.name}
                </button>

                {/* remove saved */}
                <span
                  className="p-2 flex items-center justify-center cursor-pointer hover:text-red-400"
                  onClick={(e) => {
                    e.stopPropagation();
                    remove(item.name);
                  }}
                >
                  <IoMdClose />
                </span>
              </div>
            )}
          </MenuItem>
        ))}
      </MenuItems>
    </Menu>
  );
};

export default TheDropDownForSearch;
