import React from 'react'

import { Container, Image, Text, Button } from './styles'
import * as URL from 'url'
const { remote, ipcRenderer } = require('electron')
let mainWindow
function createWindow (url: string) {
  mainWindow = new remote.BrowserWindow({
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

  mainWindow.loadFile(url)
}

const Greetings: React.FC = () => {
  const showModalHandler = async () => {
    remote.dialog.showOpenDialog({
      properties: ['openFile', 'openDirectory']
    }).then(({ filePaths }) => {
      console.log(filePaths)
      createWindow(filePaths[0] + '/index.html')
      // ipcRenderer.send('create-window', { url: filePaths[0] + '/index.html' })
    })
  }
  return (
    <Container>
      <Image
        src="https://www.vectorlogo.zone/logos/reactjs/reactjs-icon.svg"
        alt="ReactJS logo"
      />
      <Button onClick={showModalHandler}>父子模态窗口</Button>
      <Text>An Electron boilerplate including TypeScript, React, Jest and ESLint.</Text>
    </Container>
  )
}

export default Greetings
