const electron = require('electron');
const url = require('url');
const socketIO = require('socket.io');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
    mainWindow = new electron.BrowserWindow();
    //mainWindow.maximize();
    mainWindow.loadURL(url.format({
        pathname: './core/index.html',
        protocol: 'file:',
        slashes: true
    }));
    mainWindow.webContents.openDevTools();

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

electron.app.on('ready', createWindow);

// Quit when all windows are closed.
electron.app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        electron.app.quit();
    }
});

electron.app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.