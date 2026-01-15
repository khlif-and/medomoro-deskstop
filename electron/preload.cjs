const { contextBridge, ipcRenderer } = require('electron');
const os = require('os');

contextBridge.exposeInMainWorld('electron', {
    ipcRenderer: {
        send: (channel, data) => ipcRenderer.send(channel, data),
        on: (channel, func) => ipcRenderer.on(channel, (event, ...args) => func(...args)),
    },
    username: os.userInfo().username,
    hostname: os.hostname(),
    platform: os.type(), // e.g. 'Windows_NT', 'Darwin'
    version: os.release(), // OS version
});
