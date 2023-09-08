const { BrowserWindow, app, Menu } = require('electron');
require('@electron/remote/main').initialize();

function createWindow() {
    // Create the browser window
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        icon: __dirname + '/images/icons/arrow-icon.svg',
        webPreferences: {
            enableRemoteModule: true
        }
    });

    Menu.setApplicationMenu(null);

    win.loadURL('http://localhost:3000');
}

app.on('ready', createWindow);

// Quit when windows are closed
app.on('window-all-closed', () => {
    // On OS X it is common for their application and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length == 0) createWindow();
});