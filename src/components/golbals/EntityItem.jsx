import React, { useEffect, useState } from "react";

const EntityItem = ({ item, fetchTask, isActive }) => {
  const getTask = (id) => {
    fetchTask(id);
  };
  return (
    <div
      className={`w-full radius h-[98px] flex gap-[15px] item-bg items-center px-[12px] py-[12px] cursor-pointer transition hover:!bg-[var(--primary-color-light)] ${
        isActive ? "!bg-[var(--primary-color-light)] " : "bg-transparent"
      } relative`}
      onClick={() => getTask(item.id)}
    >
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
      <div className="w-fit h-full flex flex-col gap-1 grow-0 ">
        <span className="text-sm">{item.name}</span>
        {/* <span className="text-xs">{item.version}</span> */}
        <span className="text-[10px]">Desc: {item.description}</span>
        <span className="text-[8px]">Project: {item.description}</span>
      </div>
    </div>
  );
};

export default EntityItem;
