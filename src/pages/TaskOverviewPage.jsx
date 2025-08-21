import React, { useEffect, useState, useRef } from "react";
import LayoutOne from "../layout/LayoutOne";
import VideoAnnotationTwo from "../components/previewPage/videoAnnotationTwo/VideoAnnotationTwo";

const TaskOverviewPage = () => {
  const [isVisible, setIsVisible] = useState(window.innerWidth >= 1200);
  const [previewWidth, setPreviewWidth] = useState(500); // default preview width
  const isResizing = useRef(false);

  useEffect(() => {
    const handleResize = () => {
      setIsVisible(window.innerWidth >= 1200);
    };

    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e) => {
      if (!isResizing.current) return;
      const newWidth = window.innerWidth - e.clientX - 20; // -20 for padding/margins
      if (newWidth > 300 && newWidth < 800) {
        setPreviewWidth(newWidth);
      }
    };

    const stopResizing = () => {
      isResizing.current = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", stopResizing);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", stopResizing);
    };
  }, []);

  if (!isVisible) {
    return (
      <div className="w-full h-full flex items-center justify-center p-4 text-center text-xl text-white">
        The Screen size is smaller than (1000px) so do not show the overview !
      </div>
    );
  }

  return (
    <LayoutOne>
      <div className="w-full h-full flex gap-4 bg-gray-500 p-4 relative">
        {/* collapse overview  */}
        <div className="flex-1 h-full bg-gray-900"></div>

        {/* preview part */}
        <div
          className="h-full shrink-0 bg-[var(--color-purple-four)] relative"
          style={{ width: previewWidth }}
        >
          {/* resize handle */}
          <div
            className="absolute left-0 top-0 w-2 h-full cursor-col-resize bg-gray-700 hover:bg-gray-600 z-[100]"
            onMouseDown={() => {
              isResizing.current = true;
            }}
          />

          {/* the preview video part  */}
          <div
            className="w-full"
            style={{ height: previewWidth >= 500 ? "500px" : "300px" }}
          >
            <VideoAnnotationTwo previewWidth={previewWidth} />
          </div>
        </div>
      </div>

      {/* modals  */}
    </LayoutOne>
  );
};

export default TaskOverviewPage;
