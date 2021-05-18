import { app, BrowserWindow, ipcMain } from 'electron'
import * as path from 'path'
import * as URL from 'url'
import installExtension, { REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS } from 'electron-devtools-installer'
import { writeFileSync } from 'fs'

let mainWindow: Electron.BrowserWindow | null

// try {
//   require('electron-reloader')(module)
// } catch (_) {}

function createWindow (url: string) {
  writeFileSync('./a.txt', 'url123123: ')
  mainWindow = new BrowserWindow({
    width: 1100,
    height: 700,
    backgroundColor: '#191622',
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false,
      enableRemoteModule: true,
      contextIsolation: false,
      webviewTag: true
    }
  })

  if (process.env.NODE_ENV === 'development') {
    if (url) {
      console.log('URL.format ', URL.format({
        pathname: url,
        protocol: 'file:',
        slashes: true
      }))
      mainWindow.loadURL(
        URL.format({
          pathname: url,
          protocol: 'file:',
          slashes: true
        })

      )
    } else {
      mainWindow.loadURL('http://localhost:4000')
    }
  } else {
    mainWindow.loadURL(
      URL.format({
        pathname: path.join(__dirname, 'renderer/index.html'),
        protocol: 'file:',
        slashes: true
      })
    )
  }

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', () => createWindow(''))
  .whenReady()
  .then(() => {
    require('./webRequest')
    ipcMain.on('create-window', (e, { url }) => {
      createWindow(url)
    })
    if (process.env.NODE_ENV === 'development') {
      installExtension(REACT_DEVELOPER_TOOLS)
        .then((name) => console.log(`Added Extension:  ${name}`))
        .catch((err) => console.log('An error occurred: ', err))
      installExtension(REDUX_DEVTOOLS)
        .then((name) => console.log(`Added Extension:  ${name}`))
        .catch((err) => console.log('An error occurred: ', err))
    }
  })
app.allowRendererProcessReuse = true
