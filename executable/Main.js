const {app, BrowserWindow} = require('electron')
function createWindow () {
  // Create the browser window.
    let win = new BrowserWindow({width: 1920, height: 1080})
    // win.webContents.openDevTools();
    win.loadURL('https://app.scandela.fr');
}
// and load the index.html of the app.     win.loadFile('index.html')   }
app.on('ready', createWindow);

app.on("closed", function (){

  app = null
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})