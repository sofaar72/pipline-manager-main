import React from "react";

export default function FrameTimeline({ frames, onSelect, selectedIndex }) {
  return (
    <div style={{ display: "flex", overflowX: "auto", padding: "0.5rem" }}>
      {frames.map((f) => (
        <img
          key={f.index}
          src={f.src}
          alt={`Frame ${f.index}`}
          onClick={() => onSelect(f.index)}
          style={{
            width: 80,
            height: "auto",
            marginRight: 4,
            border:
              selectedIndex === f.index ? "2px solid red" : "1px solid gray",
            cursor: "pointer",
          }}
        />
      ))}
    </div>
  );
}
