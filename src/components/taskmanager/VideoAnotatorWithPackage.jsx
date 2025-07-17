import React, { useRef, useEffect } from "react";
import WebViewer from "@pdftron/webviewer";
import {
  initializeVideoViewer,
  renderControlsToDOM,
} from "@pdftron/webviewer-video";
// import { renderControlsToDOM } from "@pdftron/webviewer-video/types/src/lib";

const VideoAnotatorWithPackage = () => {
  const viewer = useRef(null);

  useEffect(() => {
    WebViewer(
      {
        path: "/webviewer/lib",
        selectAnnotationOnCreation: true,
        disabledElements: [
          "searchButton",
          "pageNavOverlay",
          "viewControlsButton",
          "penToolButton",
        ],
      },
      viewer.current
    ).then(async (instance) => {
      const license =
        "---- Insert commercial license key here after purchase ----";

      // Extends WebViewer to allow loading HTML5 videos (.mp4, ogg, webm).
      // const { loadVideo } = await initializeVideoViewer(instance, { license });

      // Load a video at a specific url. Can be a local or public link
      // If local it needs to be relative to lib/ui/index.html.
      // Or at the root. (eg '/video.mp4')
      // const videoUrl = "/videos/sample.mp4";
      const videoUrl =
        "https://pdftron.s3.amazonaws.com/downloads/pl/video/video.mp4";
      loadVideo(videoUrl);
    });
  }, []);

  return <div className="w-full h-full webviewer" ref={viewer} />;
};

export default VideoAnotatorWithPackage;
