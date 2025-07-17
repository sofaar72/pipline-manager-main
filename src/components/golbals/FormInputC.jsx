import { Radio, RadioGroup } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { useRef, useState } from "react";
import AssigneeModal from "../taskmanager/AssigneeModal";
import DropDownModal from "../taskmanager/DropDownModal";

const tasks = ["todo", "doing", "done"];

const FormInputC = (props) => {
  const {
    type,
    name,
    placeholder,
    formValue = "",
    checked = false,
    check = () => {},
    assignees = [],
    setAssignees = () => {},
    types = [],
    getTypes = () => {},
    selectedType = {},
    handleChange = () => {},
    error = "",
  } = props;
  const [selected, setSelected] = useState(tasks[0]);
  const [openAssign, setOpenAssign] = useState(false);
  const [openDropDown, setOpenDropDown] = useState(false);
  const [attachedFile, setAttachedFile] = useState(false);

  const fileInput = useRef(null);

  const attachFile = () => {
    fileInput.current.click();
  };

  if (type === "text" || type === "email" || type === "password") {
    return (
      <div className="w-full h-[42px] bg-transparent relative text-white  focus-visible:bg-transparent focus:bg-transparent">
        <input
          name={name}
          className="w-full h-full px-[4px] bg-transparent placeholder:text-sm placeholder:font-[300]"
          type={type}
          placeholder={placeholder}
          value={formValue}
          onChange={handleChange}
        />
        {/* bottom border  */}
        <div className="absolute bottom-0 w-full h-[1px] line-grad"></div>

        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
    );
  }

  if (type === "radio") {
    return (
      <div className="w-full h-[42px] bg-transparent relative">
        <div className="w-full flex items-center gap-2 justify-between px-[4px] bg-transparent">
          <span className="text-sm font-[300]">{placeholder}</span>
          <RadioGroup
            value={selected}
            onChange={setSelected}
            aria-label="Server size"
            className="flex items-center gap-[20px]"
          >
            {tasks.map((task, i) => (
              <Radio
                key={task}
                value={task}
                className="group radius relative flex items-center gap-2 cursor-pointer  px-2 py-[2px] text-white shadow-md transition focus:outline-none data-[checked]:bg-white/10 data-[focus]:outline data-[focus]:outline-white"
              >
                <span className="font-semibold text-white">{task}</span>
                <CheckCircleIcon className="size-6 fill-white opacity-0 transition group-data-[checked]:opacity-100" />
              </Radio>
            ))}
          </RadioGroup>
        </div>
        {/* bottom border  */}
        <div className="w-full h-[1px] line-grad bottom-0 absolute"></div>
      </div>
    );
  }

  if (type === "select") {
    return (
      <div className="w-full h-[42px] bg-transparent relative  z-10">
        <div
          className="w-full h-full flex items-center justify-between gap-2 cursor-pointer"
          onClick={() => setOpenAssign(!openAssign)}
        >
          <span className="text-sm font-[300] text-white/70">
            {placeholder}
          </span>
          <img
            className={`transition ${openAssign ? "rotate-180" : "rotate-0"}`}
            src="/icons/Arrow Down.svg"
            alt=""
          />
        </div>
        {/* bottom border  */}
        <div className="w-full h-[1px] line-grad bottom-0 absolute"></div>

        {/* user assign modal  */}
        <AssigneeModal
          openAssign={openAssign}
          assignees={assignees}
          setAssignees={setAssignees}
          setOpenAssign={setOpenAssign}
        ></AssigneeModal>
      </div>
    );
  }
  if (type === "select2") {
    return (
      <div className="w-full h-[42px] bg-transparent relative  z-[20]">
        <div
          className="w-full h-full flex items-center justify-between gap-2 cursor-pointer"
          onClick={() => setOpenDropDown(!openDropDown)}
        >
          <span className="text-sm font-[300] text-white/70">
            {selectedType.name ? selectedType?.name : placeholder}
          </span>
          <img
            className={`transition ${openDropDown ? "rotate-180" : "rotate-0"}`}
            src="/icons/Arrow Down.svg"
            alt=""
          />
        </div>
        {/* bottom border  */}
        <div className="w-full h-[1px] line-grad bottom-0 absolute"></div>

        {/* user assign modal  */}
        <DropDownModal
          openDropDown={openDropDown}
          closeDropDown={setOpenDropDown}
          items={types?.results}
          setItems={getTypes}
          selectedType={selectedType}
        ></DropDownModal>
      </div>
    );
  }
  if (type === "file") {
    return (
      <div className="w-full h-[134px] bg-[var(--primary-color-light)]/50 hover:bg-[var(--primary-color-light)] transition relative radius">
        <div
          className="w-full h-full flex items-center justify-center gap-2 cursor-pointer"
          onClick={() => attachFile()}
        >
          <img className="w-[30px]" src="/icons/File.svg" alt="" />
          <span className="text-lg font-[500]">{placeholder}</span>
          <input ref={fileInput} className="hidden" type="file" />
        </div>
      </div>
    );
  }
};

export default FormInputC;
