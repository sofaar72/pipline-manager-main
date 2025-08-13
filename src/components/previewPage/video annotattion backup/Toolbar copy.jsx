import React from "react";

export default function Toolbar({ tool, setTool }) {
  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        padding: "8px",
        background: "#eee",
      }}
    >
      <button
        onClick={() => setTool("select")}
        style={{ fontWeight: tool === "select" ? "bold" : "normal" }}
      >
        Select
      </button>
      <button
        onClick={() => setTool("pen")}
        style={{ fontWeight: tool === "pen" ? "bold" : "normal" }}
      >
        Pen
      </button>
      <button
        onClick={() => setTool("rect")}
        style={{ fontWeight: tool === "rect" ? "bold" : "normal" }}
      >
        Rect
      </button>
    </div>
  );
}
