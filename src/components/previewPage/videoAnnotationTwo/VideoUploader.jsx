import React from "react";

export default function VideoUploader({ onFile }) {
  return (
    <div style={{ padding: "1rem" }}>
      <input
        type="file"
        accept="video/*"
        onChange={(e) => {
          const file = e.target.files[0];
          if (file) onFile(file);
        }}
      />
    </div>
  );
}
