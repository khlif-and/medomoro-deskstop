const { app, BrowserWindow } = require('electron');
const path = require('path');

let splash;

function createSplashWindow() {
    splash = new BrowserWindow({
        width: 400,
        height: 300,
        transparent: true,
        frame: false,
        alwaysOnTop: true,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
        }
    });

    splash.loadFile(path.join(__dirname, 'splash.html'));
    splash.center();
}

function createWindow() {
    const iconPath = app.isPackaged
        ? path.join(__dirname, '../dist/ic_logo.png')
        : path.join(__dirname, '../public/ic_logo.png');

    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        show: false, // Don't show until ready
        icon: iconPath,
        autoHideMenuBar: true, // Hide the default menu bar
        webPreferences: {
            preload: path.join(__dirname, 'preload.cjs'),
            nodeIntegration: false,
            contextIsolation: true,
            sandbox: false, // Disable sandbox to allow using 'os' module in preload
            backgroundThrottling: false, // Prevent timer throttling in background
        },
        titleBarStyle: 'hidden',
        titleBarOverlay: {
            color: '#ffffff', // Match light theme or make it neutral
            symbolColor: '#334155', // Slate-700
            height: 40
        }
    });

    if (!app.isPackaged) {
        win.loadURL('http://localhost:5173');
        win.webContents.openDevTools();
    } else {
        win.loadFile(path.join(__dirname, '../dist/index.html'));
    }

    // Wait for the main window to be ready before showing it and closing splash
    win.once('ready-to-show', () => {
        // Short timeout to ensure the UI is fully painted and splash has shown for a moment
        setTimeout(() => {
            if (splash) {
                splash.destroy();
            }
            win.maximize();
            win.show();
        }, 1500); // 1.5s delay for effect
    });

    // IPC Handlers for Mini Mode
    const { ipcMain } = require('electron');

    // Remove existing listeners to prevent duplication on reload
    ipcMain.removeAllListeners('app:mini-mode');
    ipcMain.removeAllListeners('app:main-mode');

    ipcMain.on('app:mini-mode', () => {
        if (win.isMaximized()) {
            win.unmaximize();
        }
        win.setSize(300, 200, true);
        win.setAlwaysOnTop(true, 'floating'); // Changed from 'screen-saver' to 'floating' for better compatibility
        win.setVisibleOnAllWorkspaces(true); // Ensure visible across desktops
        win.setOpacity(0.95);
    });

    ipcMain.on('app:main-mode', () => {
        win.setSize(1200, 800, true);
        win.setAlwaysOnTop(false);
        win.setVisibleOnAllWorkspaces(false);
        win.setOpacity(1.0);
        win.center();
    });

    return win;
}

app.whenReady().then(() => {
    createSplashWindow();
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
