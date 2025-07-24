import React from "react";
import Dvider from "../golbals/Dvider";
import CbuttonOne from "../golbals/Buttons/CbuttonOne";

const CardBox = ({ data, type }) => {
  return (
    <div className="w-full h-full flex-1 radius flex items-start gap-[20px] border border-white/10 p-[20px] bg-gradient-to-r from-[#262437] to-[#262437]/50 border-b border-white/50 relative">
      {/* the badge  */}
      <div className="absolute -top-[10px] right-[20px] w-[56px] h-[36px] bg-[var(--primary-color-light)] flex items-center justify-center">
        <span className="text-[11px] text-white">{type}</span>
        <div
          class="absolute bottom-[-1px] left-[50%] translate-x-[-50%] w-0 h-0 rotate-180
  border-l-[10px] border-l-transparent
  border-t-[10px] border-t-[#262437]
  border-r-[10px] border-r-transparent"
        ></div>
      </div>

      {/* image part  */}
      <div className="w-[60px] h-[60px] radius overflow-hidden border border-white/50">
        <img
          className="w-full h-full object-cover"
          src="/images/entity-image.png"
          alt=""
        />
      </div>
      {/* dvider  */}
      <div className="w-[1px] h-full bg-white/30"></div>
      {/* content part  */}
      <div className="h-full flex-1 flex gap-[20px] items-start">
        <div className="flex flex-col flex-1 gap-[5px] h-full  justify-between">
          {data?.name && <span className="text-[11px]">Task Name</span>}

          {data?.status?.short_name && (
            <span className="text-[11px]">Status</span>
          )}
          {data?.duration ? (
            <span className="text-[11px]">Duration</span>
          ) : (
            <span className="text-[11px]">__</span>
          )}
          {data?.assignees?.length > 0 && (
            <span className="text-[11px]">Assignes</span>
          )}
          <span className="text-[11px]"></span>
          {data?.start_date && <span className="text-[11px]">Start Date</span>}
          {data?.end_date && <span className="text-[11px]">End Date</span>}
          <span className="text-[11px]">
            <span>Refrences</span>
          </span>
        </div>
        <div className="flex flex-1 flex-col gap-[5px] h-full  justify-between">
          {data?.name && <span className="text-[11px]">{data?.name}</span>}
          {data?.status?.short_name && (
            <span
              className={`text-[11px]`}
              style={{ color: data?.status?.color }}
            >
              {data?.status?.short_name}
            </span>
          )}
          {data?.duration ? (
            <span className="text-[11px]">{data?.duration}</span>
          ) : (
            <span className="text-[11px]">__</span>
          )}
          {data?.assignees?.length > 0 ? (
            <span className="text-[11px]">
              {data?.assignees?.slice(0, 1).map((assign) => {
                return (
                  <span className="text-xs  py-[1px]">
                    {" "}
                    {assign?.full_name},
                  </span>
                );
              })}
              <button className="text-xs cursor-pointer text-[var(--primary-color-light)]">
                more ...
              </button>
            </span>
          ) : (
            <span className="text-[11px]">__</span>
          )}
          {data?.start_date && <span className="text-[11px]">Start Date</span>}
          {data?.end_date && <span className="text-[11px]">End Date</span>}
          <div className="w-fit">
            <CbuttonOne size="11px" color={data?.status?.color} disabled>
              <span>Refrences</span>
              <img src="/icons/File.svg" alt="" />
            </CbuttonOne>
          </div>
        </div>
      </div>
    </div>
  );
};

const FileContentTopPart = ({ results }) => {
  return (
    <div className="w-full h-[300px] flex items-center justify-between  overflow-hidden  sec-grad radius  gap-[20px] sec-padd ">
      <CardBox data={results} type={"Entity"} />
      <CardBox data={results} type={"Task"} />
      {/* <CardBox data={results} type={results?.type?.name} /> */}
    </div>
  );
};

export default FileContentTopPart;
