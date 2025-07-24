import React from "react";
import Dvider from "../golbals/Dvider";
import CbuttonOne from "../golbals/Buttons/CbuttonOne";

const FileContentTopPartThree = ({ results }) => {
  return (
    <div className="w-full h-fit shrink-0 flex    overflow-hidden  sec-grad radius  gap-[20px] p-[10px] ">
      {/* image part  */}
      <div className="w-[140px] h-[140px] shrink-0 radius overflow-hidden border border-white/50">
        <img
          className="w-full h-full object-cover shrink-0"
          src="/images/entity-image.png"
          alt=""
        />
      </div>
      {/* content part  */}
      <div className="flex-1 shrink-0 max-w-[600px]">
        <div className="w-full h-full flex flex-col gap-[15px] justify-between">
          {/* Tasks info part  */}
          <div className="w-full h-full flex  gap-[20px] border-b border-white/20 items-center">
            <div className="min-w-[80px] h-full flex flex-col  gap-[5px] ">
              {results?.name && <span className="text-[11px]">Task Name</span>}

              {results?.status?.short_name && (
                <span className="text-[11px]">Status</span>
              )}
              {results?.duration ? (
                <span className="text-[11px]">Duration</span>
              ) : (
                <span className="text-[11px]">__</span>
              )}
            </div>
            <div className="min-w-[80px] h-full flex flex-col  gap-[5px] ">
              {results?.name && (
                <span className="text-[11px]">{results?.name}</span>
              )}
              {results?.status?.short_name && (
                <span
                  className={`text-[11px]`}
                  style={{ color: results?.status?.color }}
                >
                  {results?.status?.short_name}
                </span>
              )}
              {results?.duration ? (
                <span className="text-[11px]">{results?.duration}</span>
              ) : (
                <span className="text-[11px]">__</span>
              )}
            </div>
            <div className="min-w-[80px] h-full flex flex-col  gap-[5px] ">
              {results?.start_date && (
                <span className="text-[11px]">Start Date</span>
              )}
              {results?.end_date && (
                <span className="text-[11px]">End Date</span>
              )}
            </div>
            <div className="min-w-[80px] h-full flex flex-col  gap-[5px] ">
              {results?.start_date && (
                <span className="text-[11px]">Start Date</span>
              )}
              {results?.end_date && (
                <span className="text-[11px]">End Date</span>
              )}
            </div>
            <div className="min-w-[80px] h-full flex flex-col  gap-[5px] ">
              {results?.assignees && (
                <span className="text-[11px]">Assigned to :</span>
              )}
              {results?.assignees?.length > 0 ? (
                <span className="text-[11px]">
                  {results?.assignees?.slice(0, 1).map((assign) => {
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
            </div>
          </div>

          {/* Entitities info part  */}
          <div className="w-full h-full flex  gap-[20px] items-center">
            <div className="min-w-[80px] h-full flex flex-col  gap-[5px]">
              {<span className="text-[11px]">Entity Name</span>}

              {<span className="text-[11px]">Status</span>}
              {<span className="text-[11px]">Duration</span>}
            </div>
            <div className="min-w-[80px] h-full flex flex-col  gap-[5px]">
              {<span className="text-[11px]">Entity Name</span>}

              {<span className="text-[11px]">Status</span>}
              {<span className="text-[11px]">Duration</span>}
            </div>

            <div className="min-w-[80px] h-full flex flex-col  gap-[5px]">
              {<span className="text-[11px]">Description</span>}
              {/* paragraph  */}
              <div className="w-full max-w-[400px]">
                <p className="text-[11px]">
                  {/* slice the real data to 100 characters  */}
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Quisquam, quos. Lorem ipsum dolor sit amet consectetur
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileContentTopPartThree;
