import React, { useRef, useEffect } from "react";
// import { fabric } from "fabric";
import panzoom from "@panzoom/panzoom";

export const VideoAnnotator = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const fabricCanvas = useRef(null);

  // useEffect(() => {
  //   const canvasEl = canvasRef.current;

  //   // Set up Fabric.js canvas
  //   fabricCanvas.current = new fabric.Canvas(canvasEl, {
  //     isDrawingMode: true,
  //     selection: false,
  //   });

  //   fabricCanvas.current.freeDrawingBrush.width = 3;
  //   fabricCanvas.current.freeDrawingBrush.color = "red";

  //   // Match canvas size to video
  //   const video = videoRef.current;
  //   const resizeCanvas = () => {
  //     fabricCanvas.current.setHeight(video.clientHeight);
  //     fabricCanvas.current.setWidth(video.clientWidth);
  //     fabricCanvas.current.renderAll();
  //   };

  //   video.addEventListener("loadedmetadata", resizeCanvas);
  //   window.addEventListener("resize", resizeCanvas);

  //   // Enable panzoom on canvas container
  //   const panZoomInstance = panzoom(canvasEl.parentNode, {
  //     zoomSpeed: 0.065,
  //   });

  //   return () => {
  //     panZoomInstance.dispose();
  //     window.removeEventListener("resize", resizeCanvas);
  //   };
  // }, []);

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      test
      {/* <video
        ref={videoRef}
        src="/sample.mp4"
        controls
        className="w-full h-auto block"
      /> */}
      {/* <div className="absolute inset-0 z-10">
        <canvas ref={canvasRef} className="w-full h-full block" />
      </div> */}
    </div>
  );
};
