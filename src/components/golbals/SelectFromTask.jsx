import { useState } from "react";
import DropDownSelectModal from "../taskmanager/DropDownSelectModal";

const tasks = ["todo", "doing", "done"];

const SelectFromTask = (props) => {
  const {
    placeholder,
    selected = {},
    setSelected = () => {},
    handleChange = () => {},
    items = [],
  } = props;
  const [openDropDown, setOpenDropDown] = useState(false);

  return (
    <div className="w-full h-[42px] bg-transparent relative  z-[20]">
      <div
        className="w-full h-full flex items-center justify-between gap-2 cursor-pointer"
        onClick={() => setOpenDropDown(!openDropDown)}
      >
        <span className="text-sm font-[300] text-white/70">
          {selected.type ? selected?.type : placeholder}
        </span>
        <img
          className={`transition ${openDropDown ? "rotate-180" : "rotate-0"}`}
          src="/icons/Arrow Down.svg"
          alt=""
        />
      </div>
      {/* bottom border  */}
      <div className="w-full h-[1px] line-grad bottom-0 absolute"></div>

      <DropDownSelectModal
        openDropDown={openDropDown}
        closeDropDown={setOpenDropDown}
        items={items}
        setItems={setSelected}
        selected={selected}
      ></DropDownSelectModal>
    </div>
  );
};

export default SelectFromTask;
