const path = require('path')
const { app, BrowserWindow } = require('electron')

let mainWindow

function createMainWindow () {
    mainWindow = new BrowserWindow({
        title: 'Pomodoro Clock',
        width: 500,
        height: 600,
        // autoHideMenuBar: true,
        show: false,
        webPreferences: {
			nodeIntegration: true,
		},
    })

    mainWindow.setMenuBarVisibility(false)

    let indexPath

    // indexPath = `file://${__dirname}/public/index.html`
    indexPath = path.join(__dirname, "./public/index.html")

    mainWindow.loadFile(indexPath)

    // Don't show until we are ready and loaded
	mainWindow.once('ready-to-show', () => {
		mainWindow.show()
    })

    mainWindow.on('closed', () => (mainWindow = null))
}

app.on('ready', createMainWindow)

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

app.on('activate', () => {
	if (mainWindow === null) {
		createMainWindow()
	}
})

// Stop error
app.allowRendererProcessReuse = true