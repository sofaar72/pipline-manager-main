import React from "react";
import Dvider from "../golbals/Dvider";
import CbuttonOne from "../golbals/Buttons/CbuttonOne";

const FileContentTopPart = ({ results }) => {
  return (
    <div className="w-full h-[210px] flex flex-col justify-between  overflow-hidden  sec-grad radius  gap-2 sec-padd ">
      <div className="flex gap-2 h-fit items-center">
        <img className="w-[18px] h-[full" src="/icons/Bookmark.svg" alt="" />
        <h3 className="text-sm capitalize">{results?.type?.name}</h3>
      </div>
      <div className="flex gap-[18px] w-full h-[90px] justify-between py-2 items-center">
        <div className="w-[100px] h-full radius overflow-hidden">
          <img
            className="w-full h-full object-cover"
            src="/images/entity-image.png"
            alt=""
          />
        </div>
        <div className="w-full h-full flex-1 flex justify-between radius ">
          <div className="w-fit h-full flex gap-8">
            <div className="flex flex-col gap-2 justify-between">
              <span className="text-[11px] px-2 py-[1px] ">Status</span>
              <span className="text-[11px] px-2 py-[1px] ">Duration</span>
              <span className="text-[11px] px-2 py-[1px]">Assignes</span>
            </div>
            <div className="flex flex-col gap-2 justify-between">
              <div className="w-fit px-2">
                <CbuttonOne color={results?.status?.color} size="11px">
                  {results?.status?.short_name}
                </CbuttonOne>
              </div>
              <span className="text-xs px-2 py-[1px]">
                {results?.duration} <span className="text-[10px]">hours</span>
              </span>
              <div className="w-full flex items-center">
                {results?.assignees?.map((assign) => {
                  return (
                    <span className="text-xs px-2 py-[1px]">
                      {" "}
                      {assign?.full_name},
                    </span>
                  );
                })}
                <button className="text-xs cursor-pointer text-[var(--primary-color-light)]">
                  more ...
                </button>
              </div>
            </div>
          </div>
          <div className="w-fit h-full flex gap-8">
            <div className="flex flex-col gap-2 justify-between">
              <span className="text-[11px]">Start Date</span>
              <span className="text-[11px]">End Date</span>
              <span className="text-[10px]">Start Date</span>
            </div>
            <div className="flex h-full flex-col gap-2 justify-between">
              <span className="text-[11px] px-2 py-[1px] ">
                {results?.start_date}
              </span>
              <span className="text-[11px] px-2 py-[1px] ">
                {results?.end_date || "__"}
              </span>
              <CbuttonOne size="11px" color={results?.status?.color} disabled>
                <span>Refrences</span>
                <img src="/icons/File.svg" alt="" />
              </CbuttonOne>
            </div>
          </div>
        </div>
      </div>
      <Dvider />
    </div>
  );
};

export default FileContentTopPart;
