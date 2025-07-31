import { useEffect, useState } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import CbuttonTwo from "./Buttons/CbuttonTwo";

export default function CdropDown({
  options,
  init = "All",
  select,
  image = false,
  type = "normal",
  icon = "",
}) {
  const [selected, setSelected] = useState(init);

  const onChangeSelect = (e, opt) => {
    // e.preventDefault();
    console.log(opt);
    setSelected(opt.name ? opt.name : opt);
    if (type === "typeTwo") {
      select(opt);
    } else {
      select(opt.id ? opt.id : opt);
    }
  };

  return type === "normal" ? (
    <Menu as="div" className="relative inline-block text-left shrink-0 ">
      <div>
        <CbuttonTwo as={CbuttonTwo}>
          {selected}
          <ChevronDownIcon
            aria-hidden="true"
            className="-mr-1 size-5 text-gray-400"
          />
        </CbuttonTwo>
      </div>

      <MenuItems className=" absolute left-0 z-20 mt-2 w-full !min-w-26 origin-top-right rounded-md bg-primary shadow-lg ring-1 ring-black/5 text-white focus:outline-none flex flex-col ">
        {options?.map((option, i) => (
          <MenuItem key={i} as="button">
            {({ active }) => (
              <button
                onClick={(e) => onChangeSelect(e, option)}
                className={`block w-full text-left px-4 py-2 text-sm ${
                  active ? "bg-gray-100 text-gray-900" : "text-white"
                }`}
              >
                {option?.name ? option.name : option}
              </button>
            )}
          </MenuItem>
        ))}
      </MenuItems>
    </Menu>
  ) : type === "typeTwo" ? (
    <Menu as="div" className="relative shrink-0 ">
      <span className="flex items-center gap-2 text-[12px] font-normal text-white hover:bg-white/10 radius p-2 cursor-pointer">
        <MenuButton className="cursor-pointer">{icon}</MenuButton>
        {/* <span>{selected}</span> */}
      </span>

      <MenuItems className=" absolute right-0 z-20 mt-2 w-full !min-w-26 origin-top-right rounded-md bg-primary shadow-lg ring-1 ring-black/5 text-white focus:outline-none flex flex-col ">
        {options?.map((option, i) => (
          <MenuItem key={i} as="button">
            {({ active }) => (
              <button
                onClick={(e) => onChangeSelect(e, option)}
                className={`block w-full text-left px-4 py-2 text-sm ${
                  active ? "bg-gray-100 text-gray-900" : "text-white"
                }`}
              >
                {option?.name ? option.name : option}
              </button>
            )}
          </MenuItem>
        ))}
      </MenuItems>
    </Menu>
  ) : null;
}
