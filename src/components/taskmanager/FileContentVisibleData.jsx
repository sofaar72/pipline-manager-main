import CustomTabs from "../golbals/CustomTabs";
import FileContentTopPart from "./FileContentTopPart";
import FileContentTopPartTwo from "./FileContentTopPartTwo";
import FileContentTopPartThree from "./FileContentTopPartThree";

const FileContentVisibleData = ({
  taskResults,
  taskLoading,
  activeTask,
  fetchVersion,
  versionResults,
  versionLoading,
  versionError,
}) => {
  return (
    <div className="w-full h-full flex flex-col gap-[25px] sec-padd">
      {/* top part  */}
      {versionLoading ? (
        <div className="w-full h-[160px] bg-gray-500/50 radius animate-pulse sec-padd shrink-0"></div>
      ) : (
        // <>{versionResults && <FileContentTopPart results={versionResults} />}</>
        // <>
        //   {versionResults && <FileContentTopPartTwo results={versionResults} />}
        // </>
        <>
          {versionResults && (
            <FileContentTopPartThree results={versionResults} />
          )}
        </>
      )}

      {taskResults?.length > 0 && (
        <CustomTabs
          tasks={taskResults}
          loading={taskLoading}
          activeTask={activeTask}
          selectTask={fetchVersion}
          versionLoading={versionLoading}
          versionResults={versionResults}
        />
      )}
    </div>
  );
};

export default FileContentVisibleData;
