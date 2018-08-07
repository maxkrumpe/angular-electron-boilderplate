const electron = require('electron');
const url = require('url');
const path = require('path');

process.env.NODE_ENV = 'development';

const {app, BrowserWindow, Menu} = electron;

let mainWindow;

// Listen for app to be ready
app.on('ready', () => {

  let width = 800;
  let height = 600;

  // Create new window
  mainWindow = new BrowserWindow({width, height, show: false});
  // load html into window

  // save resize values to localStorage
  mainWindow.on('resize', () => {

    let {width, height} = mainWindow.getBounds();


  });

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, '../dist/index.html'),
    protocol: 'file',
    slashes: true
  }));
  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
  });
  mainWindow.on('closed', function () {
    app.quit();
    mainWindow = null;
  });

  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  Menu.setApplicationMenu(mainMenu);
});

const mainMenuTemplate = [
  {
    label: 'File',
    submenu: [
      {
        label: 'Refresh',
        accelerator: process.platform === 'darwin' ? 'Command+R' : 'Ctrl+R',
        click() {
          mainWindow.reload();
        }
      },
      {
        label: 'Quit',
        accelerator: process.platform === 'darwin' ? 'Command+Q' : 'Ctrl+Q',
        click() {
          app.quit();
        }
      }
    ]
  }
];

if (process.platform === 'darwin') {
  mainMenuTemplate.unshift({});
}

if (process.env.NODE_ENV !== 'production') {
  mainMenuTemplate.push({
    label: 'Developer Tools',
    submenu: [
      {
        label: 'Toggle DevTools',
        accelerator: process.platform === 'darwin' ? 'Command+I' : 'Ctrl+I',
        click(item, focusedWindow) {
          focusedWindow.toggleDevTools();
        }
      }
    ]
  });
}
