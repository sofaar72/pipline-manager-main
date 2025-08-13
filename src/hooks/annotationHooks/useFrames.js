export async function extractFramesFromFile(file, fps = 25) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const video = document.createElement("video");
    video.src = url;
    video.crossOrigin = "anonymous";
    video.muted = true; // avoid autoplay block

    video.addEventListener("loadedmetadata", () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const duration = video.duration;
      const totalFrames = Math.floor(duration * fps);
      const frames = [];
      let currentFrame = 0;

      const captureNextFrame = () => {
        // Draw current frame
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        frames.push({
          index: currentFrame,
          src: canvas.toDataURL("image/png"),
        });

        currentFrame++;

        if (currentFrame < totalFrames) {
          // Move to next frame time
          video.currentTime = currentFrame / fps;
        } else {
          URL.revokeObjectURL(url);
          resolve(frames);
        }
      };

      // Each time the video seeks, capture the frame
      video.addEventListener("seeked", captureNextFrame);

      // Start with first frame
      video.currentTime = 0;
    });

    video.onerror = reject;
  });
}
