const { contextBridge, ipcRenderer } = require("electron");
const Store = require("electron-store");

const store = new Store();

contextBridge.exposeInMainWorld("electronStore", {
  get: (key) => store.get(key),
  set: (key, value) => store.set(key, value),
  delete: (key) => store.delete(key),
  send: (channel, data) => ipcRenderer.send(channel, data),
  on: (channel, func) =>
    ipcRenderer.on(channel, (event, ...args) => func(...args)),
});
