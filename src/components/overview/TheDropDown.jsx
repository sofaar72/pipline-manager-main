import React, { useEffect, useState } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import CbuttonTwo from "../golbals/Buttons/CbuttonTwo";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { IoCheckbox } from "react-icons/io5";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import TheIcon from "./TheIcon";

const TheDropDown = ({
  width,
  init = "test",
  value, // Add this prop for controlled component
  items = [],
  cClass = "",
  type = "default",
  funcAfter = () => {},
  funcAfterForSearch = () => {},
  users,
}) => {
  const [selected, setSelected] = useState(value || init);
  // const [checked, setChecked] = useState([]);

  const [checked, setChecked] = useState(() =>
    (users || []).map((u) => ({
      id: u.id,
      checked: true,
    }))
  );

  useEffect(() => {
    if (users?.length) {
      setChecked(
        users.map((u) => ({
          id: u.id,
          checked: true,
        }))
      );
    }
  }, [users]);

  // Update local state when value prop changes
  useEffect(() => {
    if (value !== undefined) {
      setSelected(value);
    }
  }, [value]);

  const selectHandler = (e, item) => {
    // e.preventDefault();
    // console.log("selected", item.name);

    setSelected(item.name);
    funcAfter(item);
  };

  const checkHandler = (item) => {
    setChecked((prev = []) => {
      // Prevent duplicates
      if (prev.some((p) => p.id === item.id)) {
        return prev.map((p) =>
          p.id === item.id ? { ...p, checked: !p.checked } : p
        );
      }

      // Otherwise add new
      return [
        ...prev,
        {
          id: item.id,
          checked: true,
        },
      ];
    });
  };

  useEffect(() => {
    if (type !== "visual") return;
    if (!checked || checked.length === 0) return;

    const selectedItems = items.filter((item) =>
      checked.some((c) => c.id === item.id && c.checked)
    );

    funcAfter(selectedItems);
  }, [checked]);

  return (
    <Menu as="div" className="relative inline-block text-left shrink-0">
      <MenuButton
        as={CbuttonTwo}
        cClass={`${cClass} h-[35px] bg-[var(--overview-color-two)] ${
          width ? width : "w-[150px]"
        }  p-2 h-lg flex !justify-between`}
      >
        <span>
          {selected.length > 10 ? selected.slice(0, 10) + "..." : selected}
        </span>
        <ChevronDownIcon
          aria-hidden="true"
          className="-mr-1 size-4 text-white"
        />
      </MenuButton>

      {type === "default" ? (
        <MenuItems className="overflow-y-auto max-h-[150px] absolute z-[9999] left-0 z-20 mt-2 w-full !min-w-26 origin-top-right rounded-md bg-primary shadow-lg ring-1 ring-black/5 text-white focus:outline-none flex flex-col">
          {items.map((item) => (
            <MenuItem key={item.name}>
              {({ active }) => (
                <button
                  className={`block w-full text-left px-4 py-2 text-sm h-regular cursor-pointer ${
                    active ? "bg-[var(--overview-color-two)]" : ""
                  }`}
                  onClick={(e) => selectHandler(e, item)}
                  onContextMenu={(e) => {
                    e.preventDefault();
                    funcAfterForSearch();
                  }}
                >
                  {item.name.length > 20
                    ? item.name.slice(0, 20) + "..."
                    : item.name}
                </button>
              )}
            </MenuItem>
          ))}
        </MenuItems>
      ) : type === "visual" ? (
        <MenuItems className="overflow-y-auto max-h-[150px] absolute z-[9999] left-0 z-20 mt-2 w-full !min-w-26 origin-top-right rounded-md bg-primary shadow-lg ring-1 ring-black/5 text-white focus:outline-none flex flex-col gap-4 px-2 py-2">
          {items.map((item) => (
            <MenuItem key={item.name} onClick={(e) => selectVisulHandler()}>
              {({ active }) => (
                <div
                  className="w-full flex items-center justify-between gap-2"
                  onClick={(e) => {
                    e.preventDefault(); // 👈 prevent dropdown from closing
                    e.stopPropagation(); // 👈 prevent bubbling to MenuItem
                    checkHandler(item);
                  }}
                >
                  <div className="flex items-center gap-2">
                    <img
                      className="w-[20px] h-[20px] rounded-full"
                      src={item.avatar || ""}
                      alt=""
                    />
                    <TheIcon cClass="!w-fit !h-fit !p-0 border-none text-xl">
                      {checked.some((c) => c.id === item.id && c.checked) ? (
                        <IoCheckbox />
                      ) : (
                        <MdCheckBoxOutlineBlank /> // fallback unchecked icon
                      )}
                    </TheIcon>
                  </div>
                  <div
                    className={`w-full flex-1 text-left  py-2  text-sm h-regular cursor-pointer ${
                      active ? "bg-[var(--overview-color-two)]" : ""
                    }`}
                  >
                    {item.name.length > 20
                      ? item.name.slice(0, 20) + "..."
                      : item.name}
                  </div>
                </div>
              )}
            </MenuItem>
          ))}
        </MenuItems>
      ) : (
        ""
      )}
    </Menu>
  );
};

export default TheDropDown;
