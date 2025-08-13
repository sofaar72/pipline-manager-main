import LayoutOne from "../layout/LayoutOne";

import { EpisodeManagerProvider } from "../assets/context/EpisodeManagerContext";

import PreviewPrev from "../components/golbals/PlaceHolders.jsx/PreviewPrev";
import PreviewPageContents from "../components/previewPage/PreviewPageContents";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useComments } from "../hooks/useComments";

const PreviewPage = () => {
  const location = useLocation();
  const taskId = location?.state?.taskId || {};
  const versionId = location?.state?.versionId || {};
  const fileId = location?.state?.fileId || {};
  const video = location?.state?.video || {};

  const {
    getAllComments,
    comments,
    loading: commentsLoading,
    error: commentsError,
    sendTheComment,
    sendAllAnnotations,
    annotationLoading,
    annotationError,
  } = useComments();
  useEffect(() => {
    getAllComments(versionId);
  }, []);

  return (
    <LayoutOne>
      <div className="w-full h-full text-white flex gap-[30px] flex-col lg:flex-row">
        <div className="w-full h-full">
          {/* <PreviewPrev /> */}
          <PreviewPageContents
            comments={comments}
            sendComment={sendTheComment}
            sendAllAnnotations={sendAllAnnotations}
            fileId={fileId}
            videoUrl={video}
          />
        </div>
      </div>
    </LayoutOne>
  );
};

export default PreviewPage;
