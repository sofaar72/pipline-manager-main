import React, { useEffect, useMemo, useRef, useState } from "react";

// A simple, draggable progress bar that displays duration and frame markers.
// - durationSeconds: total media duration in seconds (float)
// - totalFrames: number of frames in the timeline (int >= 1)
// - currentFrameIndex: current frame index (0-based)
// - onSeek: function(frameIndex) to request seeking
// - annotations: array of { frameId, shapes: [...] } to show markers on frames that have shapes
// - enabled: whether interaction is enabled (e.g., when at least one side is a video)
const VideoProgress = ({
  durationSeconds = 0,
  totalFrames = 1,
  currentFrameIndex = 0,
  onSeek,
  annotations = [],
  enabled = false,
}) => {
  const trackRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const safeTotalFrames = Math.max(1, totalFrames || 1);

  // Map current frame to time (seconds)
  const currentTime = useMemo(() => {
    if (!durationSeconds || safeTotalFrames <= 1) return 0;
    const timePerFrame = durationSeconds / safeTotalFrames;
    return Math.min(
      durationSeconds,
      Math.max(0, currentFrameIndex * timePerFrame)
    );
  }, [durationSeconds, currentFrameIndex, safeTotalFrames]);

  const annotationFrameSet = useMemo(() => {
    const set = new Set();
    if (Array.isArray(annotations)) {
      annotations.forEach((f) => {
        if (
          f &&
          typeof f.frameId === "number" &&
          f.shapes &&
          f.shapes.length > 0
        ) {
          set.add(f.frameId);
        }
      });
    }
    return set;
  }, [annotations]);

  const handlePointer = (clientX) => {
    if (!trackRef.current || !enabled) return;
    const rect = trackRef.current.getBoundingClientRect();
    const x = Math.min(rect.right, Math.max(rect.left, clientX)) - rect.left;
    const ratio = rect.width > 0 ? x / rect.width : 0;
    const targetFrame = Math.round(ratio * (safeTotalFrames - 1));
    if (onSeek) onSeek(targetFrame);
  };

  const onMouseDown = (e) => {
    if (!enabled) return;
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
    handlePointer(e.clientX);
  };
  const onMouseMove = (e) => {
    if (!enabled || !isDragging) return;
    e.preventDefault();
    e.stopPropagation();
    handlePointer(e.clientX);
  };
  const onMouseUp = () => setIsDragging(false);

  useEffect(() => {
    if (!isDragging) return;
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [isDragging]);

  // Touch events
  const onTouchStart = (e) => {
    if (!enabled) return;
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
    const t = e.touches[0];
    if (t) handlePointer(t.clientX);
  };
  const onTouchMove = (e) => {
    if (!enabled || !isDragging) return;
    e.preventDefault();
    e.stopPropagation();
    const t = e.touches[0];
    if (t) handlePointer(t.clientX);
  };
  const onTouchEnd = () => setIsDragging(false);

  // While dragging, prevent text selection globally
  useEffect(() => {
    if (isDragging) {
      const prevUserSelect = document.body.style.userSelect;
      document.body.style.userSelect = "none";
      return () => {
        document.body.style.userSelect = prevUserSelect;
      };
    }
  }, [isDragging]);

  // Marker positions (as %)
  const markerPercents = useMemo(() => {
    const arr = [];
    annotationFrameSet.forEach((frameId) => {
      const pct = (frameId / Math.max(1, safeTotalFrames - 1)) * 100;
      arr.push(Math.max(0, Math.min(100, pct)));
    });
    return arr.sort((a, b) => a - b);
  }, [annotationFrameSet, safeTotalFrames]);

  const progressPercent = useMemo(() => {
    return (currentFrameIndex / Math.max(1, safeTotalFrames - 1)) * 100;
  }, [currentFrameIndex, safeTotalFrames]);

  return (
    <div className="w-full h-[40px] flex flex-col bg-[var(--overview-color-one)] px-2">
      <div className="w-full px-2 py-1 flex items-center justify-between text-xs text-[var(--overview-text-color)]">
        <span>
          {durationSeconds ? `${durationSeconds.toFixed(2)}s` : "0.00s"}
        </span>
        <span>
          frame {currentFrameIndex + 1} / {safeTotalFrames}
        </span>
      </div>
      <div
        ref={trackRef}
        className={`w-full h-[15px] mb-2 rounded relative ${
          enabled ? "cursor-pointer" : "cursor-not-allowed"
        }`}
        style={{ background: "var(--overview-color-four)" }}
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Discrete frame segments (like TheFrames.jsx) */}
        <div className="absolute inset-0 flex">
          {Array.from({ length: safeTotalFrames }).map((_, i) => {
            const isSelected = i === currentFrameIndex;
            const hasAnnotation = annotationFrameSet.has(i);
            const isBefore = i < currentFrameIndex;
            let background = "";
            if (isSelected) background = "var(--overview-color-progress)";
            else if (hasAnnotation) background = "var(--overview-color-faild)";
            else if (isBefore) background = "var(--overview-color-done)";
            else
              background =
                i % 2 === 1
                  ? "var(--overview-color-three)"
                  : "var(--overview-color-four)";

            return (
              <div
                key={i}
                className="h-full"
                style={{ width: `${100 / safeTotalFrames}%`, background }}
                onMouseDown={() => enabled && onSeek && onSeek(i)}
                onMouseEnter={() =>
                  enabled && isDragging && onSeek && onSeek(i)
                }
              />
            );
          })}
        </div>
        {/* Translucent progress overlay */}
        <div
          className="absolute top-0 left-0 h-full"
          style={{
            width: `${progressPercent}%`,
            background: "var(--overview-color-progress)",
            opacity: 0.25,
            pointerEvents: "none",
          }}
        />
        {/* Markers for annotated frames */}
        {markerPercents.map((pct, idx) => (
          <div
            key={`m-${idx}`}
            className="absolute top-0 h-full"
            style={{
              left: `${pct}%`,
              width: "2px",
              background: "var(--overview-color-faild)",
              transform: "translateX(-1px)",
            }}
          />
        ))}
        {/* Handle */}
        <div
          className="absolute top-1/2 -translate-y-1/2 w-[10px] h-[10px] rounded-full z-10"
          style={{
            left: `${progressPercent}%`,
            background: "var(--overview-color-progress)",
            transform: "translate(-50%, -50%)",
            boxShadow: "0 0 2px rgba(0,0,0,0.5)",
          }}
        />
      </div>
      {/* Full-screen shield to block interactions while dragging */}
      {isDragging && (
        <div
          className="fixed inset-0 z-[999999] cursor-grabbing"
          style={{ pointerEvents: "all" }}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          onContextMenu={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        />
      )}
    </div>
  );
};

export default VideoProgress;
