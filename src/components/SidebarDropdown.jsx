// components/globals/SidebarDropdown.js
import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";

const SidebarDropdown = ({ label, links }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropRef = useRef(null);
  const [dropHeight, setDropHeight] = useState(0);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    const el = dropRef.current;
    if (el) {
      el.style.height = `${el.scrollHeight}px`;
      setDropHeight(el.scrollHeight);
    }
  }, [isOpen]);

  return (
    <div
      className={`w-full flex cursor-pointer flex-col relative text-sm hover:text-[var(--primary-color-light)] transition h-[30px] p-[3px] rounded-full`}
      style={{
        height: isOpen ? `calc(${dropHeight}px + 30px)` : "30px",
      }}
      onClick={toggleDropdown}
    >
      <span>{label}</span>
      <div
        ref={dropRef}
        className={`absolute left-0 top-[25px] w-full py-4 flex gap-2 overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen
            ? "opacity-100 translate-y-0 pointer-events-auto scale-100"
            : "opacity-0 translate-y-[-10%] pointer-events-none scale-0"
        }`}
      >
        <img className="w-[15px] h-[44px]" src="/images/lines.png" alt="" />
        <div className="flex-1 flex flex-col gap-2">
          {links.map(({ label, to }) => (
            <NavLink
              key={to}
              to={to}
              className="text-white hover:text-[var(--primary-color-light)]"
            >
              {label}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SidebarDropdown;
