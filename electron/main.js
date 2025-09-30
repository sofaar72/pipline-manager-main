import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import net from "net";
import dgram from "dgram";
import { fileURLToPath } from "url";

// const path = require("path");

// const dgram = require("dgram");
let SerialPort = null;

try {
  const sp = require("serialport");
  SerialPort = sp?.SerialPort || sp?.default || null;
} catch (err) {
  // serialport not installed — that's fine if you won't use serial
  SerialPort = null;
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "../electron/preload.js"),
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
    },
  });

  mainWindow.loadFile(path.join(__dirname, "../dist/index.html"));
  mainWindow.webContents.openDevTools(); // this is optional thing, use it if you see a devTool window opened
}

app
  .whenReady()
  .then(() => {
    //additional logic here
  })
  .then(createWindow);

app.on("window-all-closed", () => {
  // eslint-disable-next-line no-undef
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// ---------- IPC handlers that actually send data ----------

// 1) TCP (connect, write, close)
ipcMain.handle(
  "send-tcp",
  async (event, { host = "127.0.0.1", port, data, timeout = 5000 }) => {
    return new Promise((resolve, reject) => {
      const socket = new net.Socket();
      const timer = setTimeout(() => {
        socket.destroy();
        reject(new Error("TCP send timeout"));
      }, timeout);

      socket.connect(port, host, () => {
        const buf =
          typeof data === "string"
            ? Buffer.from(data, "utf8")
            : Buffer.from(data);
        socket.write(buf, (err) => {
          clearTimeout(timer);
          if (err) {
            socket.destroy();
            reject(err);
          } else {
            socket.end(); // close cleanly
            resolve({ ok: true });
          }
        });
      });

      socket.on("error", (err) => {
        clearTimeout(timer);
        reject(err);
      });
    });
  }
);

// 2) UDP (fire-and-forget)
ipcMain.handle(
  "send-udp",
  async (event, { host = "127.0.0.1", port, data }) => {
    return new Promise((resolve, reject) => {
      const socket = dgram.createSocket("udp4");
      const buf =
        typeof data === "string"
          ? Buffer.from(data, "utf8")
          : Buffer.from(data);
      socket.send(buf, port, host, (err) => {
        socket.close();
        if (err) reject(err);
        else resolve({ ok: true });
      });
    });
  }
);

// 3) Serial (COM port) — only if serialport is installed
ipcMain.handle(
  "send-serial",
  async (event, { portPath, baudRate = 9600, data }) => {
    if (!SerialPort)
      throw new Error("serialport package not installed in main process");

    return new Promise((resolve, reject) => {
      const sp = new SerialPort({
        path: portPath,
        baudRate: Number(baudRate),
        autoOpen: false,
      });

      sp.open((err) => {
        if (err) return reject(err);
        const buf =
          typeof data === "string"
            ? Buffer.from(data, "utf8")
            : Buffer.from(data);

        sp.write(buf, (err) => {
          if (err) {
            sp.close(() => reject(err));
          } else {
            sp.drain((err) => {
              sp.close(() => {
                if (err) reject(err);
                else resolve({ ok: true });
              });
            });
          }
        });
      });
    });
  }
);
