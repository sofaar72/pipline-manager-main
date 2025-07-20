import CustomTabs from "../golbals/CustomTabs";
import FileContentTopPart from "./FileContentTopPart";

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
        <div className="w-full h-[210px] bg-gray-500/50 radius animate-pulse sec-padd"></div>
      ) : (
        <>{versionResults && <FileContentTopPart results={versionResults} />}</>
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
