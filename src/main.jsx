import { StrictMode } from "react";
// import { app, BrowserWindow } from "electron";
// import path from "path";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./store/Store.js";

// function createWindow() {
//   const win = new BrowserWindow({
//     width: 1280,
//     height: 800,
//     webPreferences: {
//       nodeIntegration: false,
//       contextIsolation: true,
//     },
//   });

//   win.loadFile(path.join(__dirname, "dist/index.html"));
// }

// app.whenReady().then(() => {
//   createWindow();

//   app.on("activate", function () {
//     if (BrowserWindow.getAllWindows().length === 0) createWindow();
//   });
// });

// app.on("window-all-closed", function () {
//   if (process.platform !== "darwin") app.quit();
// });

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
  // </StrictMode>
);
