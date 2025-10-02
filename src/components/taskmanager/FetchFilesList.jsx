import React from "react";
import Loading from "../golbals/Loading";
import FilesItemExport from "../golbals/FilesItemExport";

const FetchFilesList = ({ files, filesLoading, setVersionFiles }) => {
  return (
    <>
      {/* all files  */}
      <div className="w-full h-full bg-[var(--primary-color-light)]/20 radius flex flex-col gap-2 overflow-y-auto ">
        {filesLoading ? (
          <div className="w-full h-full flex items-center justify-center">
            <Loading />
          </div>
        ) : (
          <div className="w-full h-full flex flex-col gap-2 px-2 py-2 ">
            {files?.results?.map((file, i) => (
              //   <div key={file.id} className="w-full h-[40px] bg-red-500">
              //     <span>{file.name}</span>
              //   </div>

              <FilesItemExport
                file={file}
                key={i}
                download={false}
                setVersionFiles={setVersionFiles}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default FetchFilesList;
