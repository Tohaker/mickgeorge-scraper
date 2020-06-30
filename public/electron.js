// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require("electron");
const { autoUpdater } = require("electron-updater");
const Store = require("electron-store");
const contextMenu = require("electron-context-menu");
const path = require("path");
const url = require("url");

contextMenu();

const schema = {
  urls: {
    type: "array",
    items: {
      type: "string",
    },
  },
  selectedUrl: {
    type: "string",
  },
  username: {
    type: "string",
  },
  domain: {
    type: "string",
  },
};

function createWindow() {
  // Setup the JSON Store.
  const store = new Store({ schema });
  if (!!!store.get("urls")) {
    store.set("urls", ["https://portal.hv-select.com/businessportal/"]);
  }

  if (!!!store.get("selectedUrl")) {
    store.set("selectedUrl", "https://portal.hv-select.com/businessportal/");
  }

  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  ipcMain.handle("getStoreValue", (event, key) => {
    return store.get(key);
  });

  ipcMain.on("setStoreValue", (event, { key, value }) => {
    if (value) {
      store.set(key, value);
    } else {
      store.delete(key);
    }
  });

  const startUrl =
    process.env.ELECTRON_START_URL ||
    url.format({
      pathname: path.join(__dirname, "../build/index.html"),
      protocol: "file:",
      slashes: true,
    });

  // and load the index.html of the app.
  mainWindow.loadURL(startUrl);

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  autoUpdater.checkForUpdatesAndNotify();

  createWindow();

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed.
app.on("window-all-closed", function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") app.quit();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
require("./server");
