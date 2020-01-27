import { BrowserWindow } from 'electron'
import store from './store'

const isDev = process.env.NODE_ENV === 'development'

let mainWindow
const winURL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:9080'
    : `file://${__dirname}/index.html`

function createMainWindow () {
  const bounds = {
    height: 563,
    width: 1000,
    ...store.app.get('bounds')
  }

  mainWindow = new BrowserWindow({
    title: 'massCode',
    useContentSize: true,
    titleBarStyle: 'hidden',
    // Убираем хайлайт вокруг приложения на Mac
    transparent: process.platform === 'darwin',
    webPreferences: {
      nodeIntegration: true
    }
  })

  mainWindow.setBounds(bounds)
  mainWindow.loadURL(winURL)

  if (isDev) {
    mainWindow.webContents.openDevTools({ mode: 'detach' })
  }

  mainWindow.on('close', () => {
    store.app.set('bounds', mainWindow.getBounds())
  })

  mainWindow.on('closed', e => {
    mainWindow = null
  })
}

export { createMainWindow, mainWindow }
