import { useEffect, useState } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import CbuttonTwo from "./Buttons/CbuttonTwo";

export default function CdropDown({
  options,
  init = "",
  select,
  image = false,
}) {
  const [selected, setSelected] = useState(init);

  const onChangeSelect = (e, opt) => {
    e.preventDefault();
    setSelected(opt);
    select(opt);
  };

  return (
    <Menu as="div" className="relative inline-block text-left ">
      <div>
        <CbuttonTwo as={CbuttonTwo}>
          {selected}
          <ChevronDownIcon
            aria-hidden="true"
            className="-mr-1 size-5 text-gray-400"
          />
        </CbuttonTwo>
      </div>
      {image ? (
        <MenuItems className=" absolute left-0 z-20 mt-2 w-fit !min-w-20 origin-top-right rounded-md bg-primary shadow-lg ring-1 ring-black/5 text-white focus:outline-none flex flex-col ">
          {options.map((option) => (
            <MenuItem key={option} as="button">
              {({ active }) => (
                <button
                  onClick={(e) => onChangeSelect(e, option)}
                  className={`block w-full text-left px-4 py-2 text-sm ${
                    active ? "bg-gray-100 text-gray-900" : "text-white"
                  }`}
                >
                  {option}
                </button>
              )}
            </MenuItem>
          ))}
        </MenuItems>
      ) : (
        // image
        // <MenuItems className=" absolute left-0 z-20 mt-2 w-fit !min-w-20 origin-top-right rounded-md bg-primary shadow-lg ring-1 ring-black/5 text-white focus:outline-none flex flex-col ">
        //   {options.map((option) => (
        //     <MenuItem key={option} as="button">
        //       {({ active }) => (
        //        <img src="" alt="" />
        //       )}
        //     </MenuItem>
        //   ))}
        // </MenuItems>
        <></>
      )}
    </Menu>
  );
}
