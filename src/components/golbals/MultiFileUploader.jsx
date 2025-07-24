import { useState } from "react";
import * as tus from "tus-js-client";

// const TusUploader = ({ file }) => {
//   const { start, pause, resume, percentage } = useTus({
//     endpoint: "https://tus.example.com/files/",
//     file,
//     metadata: {
//       filename: file.name,
//       filetype: file.type,
//     },
//     onSuccess: () => console.log(`${file.name} uploaded successfully`),
//     onError: (error) => console.log(error),
//   });

//   return (
//     <div>
//       <p>{file.name}</p>
//       <button onClick={start}>Start</button>
//       <button onClick={pause}>Pause</button>
//       <button onClick={resume}>Resume</button>
//       <p>Progress: {Math.round(percentage)}%</p>
//     </div>
//   );
// };

export const MultiFileUploader = ({ files, url }) => {
  const handleUpload = (e) => {
    files.map((file) => {
      // Create a new tus upload
      const upload = new tus.Upload(file, {
        endpoint: "http://localhost:1080/files/",
        retryDelays: [0, 3000, 5000, 10000, 20000],
        metadata: {
          filename: file.name,
          filetype: file.type,
        },
        onError: function (error) {
          console.log("Failed because: " + error);
        },
        onProgress: function (bytesUploaded, bytesTotal) {
          var percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2);
          console.log(bytesUploaded, bytesTotal, percentage + "%");
        },
        onSuccess: function () {
          console.log("Download %s from %s", upload.file.name, upload.url);
        },
      });
      // Check if there are any previous uploads to continue.
      upload?.findPreviousUploads().then(function (previousUploads) {
        // Found previous uploads so we select the first one.
        if (previousUploads.length) {
          upload?.resumeFromPreviousUpload(previousUploads[0]);
        }

        // Start the upload
        upload.start();
      });
    });
  };

  return null;
};
