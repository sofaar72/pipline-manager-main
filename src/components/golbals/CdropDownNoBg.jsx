import { useEffect, useState } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

export default function CdropDownNoBg({ options, init = "", select }) {
  const [selected, setSelected] = useState(init);

  const onChangeSelect = (e, opt) => {
    // e.preventDefault();

    setSelected(opt);
    select(opt);
  };

  return (
    <Menu as="div" className="relative inline-block text-left ">
      <div>
        <MenuButton className="flex items-center justify-between gap-2 cursor-pointer">
          {selected}
          <ChevronDownIcon
            aria-hidden="true"
            className="-mr-1 size-5 text-gray-400"
          />
        </MenuButton>
      </div>

      <MenuItems className=" absolute right-0 z-20 mt-2 w-fit !min-w-20 origin-top-right rounded-md bg-primary shadow-lg ring-1 ring-black/5 text-white focus:outline-none flex flex-col ">
        {options?.map((option) => (
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
  );
}
