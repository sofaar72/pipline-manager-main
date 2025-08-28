import React, { useState } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import CbuttonTwo from "../golbals/Buttons/CbuttonTwo";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { MdDelete } from "react-icons/md";
import { MdOutlineArrowDropDown } from "react-icons/md";

const TheSavedFiltersDropDown = ({
  width,
  init = "Saved filters",
  items = [],
  funcAfter = () => {},
}) => {
  const [selected, setSelected] = useState(init);

  const selectHandler = (e, item) => {
    // e.preventDefault();
    setSelected(item.name);
    funcAfter(item);
  };

  return (
    <Menu as="div" className="relative inline-block text-left shrink-0">
      <MenuButton
        as={CbuttonTwo}
        cClass={`!h-[35px] bg-[var(--overview-color-two)] ${
          width ? width : "w-[150px]"
        }  p-2 h-lg flex !justify-between`}
      >
        <span>{selected}</span>
        <div className="flex gap-[10px]">
          <MdOutlineArrowDropDown className="-mr-1 text-lg text-white" />
          <MdDelete className="text-lg" />
        </div>
      </MenuButton>

      <MenuItems className="overflow-hidden absolute left-0 z-20 mt-2 w-full !min-w-26 origin-top-right rounded-md bg-primary shadow-lg ring-1 ring-black/5 text-white focus:outline-none flex flex-col">
        {/* {items.map((item) => (
          <MenuItem key={item.name}>
            {({ active }) => (
              <button
                onClick={(e) => selectHandler(e, item)}
                className={`block w-full text-left px-4 py-2 text-sm h-regular cursor-pointer ${
                  active ? "bg-[var(--overview-color-two)]" : ""
                }`}
              >
                {item.name.length > 20
                  ? item.name.slice(0, 20) + "..."
                  : item.name}
              </button>
            )}
          </MenuItem>
        ))} */}
      </MenuItems>
    </Menu>
  );
};

export default TheSavedFiltersDropDown;
