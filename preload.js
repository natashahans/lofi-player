const { contextBridge, ipcRenderer } = require("electron");
const path = require("path");

contextBridge.exposeInMainWorld("electronAPI", {
  minimizeApp: () => ipcRenderer.send("minimize-app"),
  closeApp: () => ipcRenderer.send("close-app"),
  imagePath: (imageName) => path.join(__dirname, "images", imageName),
});
