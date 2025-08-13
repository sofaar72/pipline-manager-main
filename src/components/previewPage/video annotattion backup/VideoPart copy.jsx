import React, { useEffect, useState } from "react";
import VideoUploader from "./VideoUploader";
import FrameTimeline from "./FrameTimeline";
import AnnotatorStage from "./AnnotatorStage";
import Toolbar from "./Toolbar";
import { extractFramesFromFile } from "../../../hooks/annotationHooks/useFrames";

export default function VideoPart() {
  const [frames, setFrames] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [tool, setTool] = useState("select");

  const handleFile = async (file) => {
    const extracted = await extractFramesFromFile(file, 1); // 1 fps for speed
    setFrames(extracted);
    setCurrentIndex(0);
  };

  return (
    <div className="relative">
      <VideoUploader onFile={handleFile} />
      {frames.length > 0 && (
        <>
          <FrameTimeline
            frames={frames}
            selectedIndex={currentIndex}
            onSelect={(i) => setCurrentIndex(i)}
          />
          <div style={{ position: "relative", display: "inline-block" }}>
            <div className="absolute top-0 z-[999]">
              <Toolbar tool={tool} setTool={setTool} />
            </div>
            <AnnotatorStage frame={frames[currentIndex]} tool={tool} />
          </div>
        </>
      )}
    </div>
  );
}
