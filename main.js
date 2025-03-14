const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

function createWindow() {
  const win = new BrowserWindow({
    width: 320,
    height: 520,
    transparent: true,
    frame: false,
    resizable: false,
    skipTaskbar: false,

    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadFile("index.html");

  // Ensure it stays in the taskbar after minimizing
  win.on("minimize", () => {
    win.setSkipTaskbar(false);
  });
}

// Handle minimize event
ipcMain.on("minimize-app", () => {
  const win = BrowserWindow.getFocusedWindow();
  if (win) {
    win.minimize(); // Use minimize instead of hide
  }
});

// Handle close event
ipcMain.on("close-app", () => {
  app.quit();
});

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
