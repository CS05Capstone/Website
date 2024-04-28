// const { app, BrowserWindow } = require('electron');
// const path = require('path');
// const { spawn } = require('child_process'); // used to import the spawn method in module child_process 

// const keyPath = path.join(__dirname, 'googleCloud/static-groove-395514-8415acddf61d.json');
// process.env.GOOGLE_APPLICATION_CREDENTIALS = keyPath;

// let win;
// let backendProcess; //  used to the reference of the backend process

// function createWindow() {
//   win = new BrowserWindow({
//     width: 800,
//     height: 600,
//     webPreferences: {
//       nodeIntegration: true,
//       contextIsolation: false,
//       enableRemoteModule: true,
//     }
//   });

//   const appPath = app.getAppPath();
//   win.loadURL(`file://${path.join(appPath, 'build/index.html')}`);

//   //自动打开调试
//   // win.webContents.openDevTools();


//   win.on('closed', () => {
//     win = null;
//   });
// }

// app.on('ready', () => {
//   // 启动 Spring Boot JAR 文件
//   // backendProcess = spawn('java', ['-jar', path.join(__dirname, 'server/mybaitsplusDemo-0.0.1-SNAPSHOT.jar')]);
//   backendProcess = spawn('java', ['-jar', path.join(__dirname, 'server/mybaitsplusDemo-0.0.1-SNAPSHOT.jar')], {
//     env: {
//       ...process.env,
//       GOOGLE_APPLICATION_CREDENTIALS: keyPath
//     }
//   });
  
//   backendProcess.stdout.on('data', (data) => {
//     console.log(`Backend Output: ${data}`);
//   });
//   backendProcess.stderr.on('data', (data) => {
//     console.error(`Backend Error: ${data}`);
//   });
//   createWindow();
// });

// app.on('window-all-closed', () => {
//   if (backendProcess) {
//     backendProcess.kill(); //ensure the backend is shut down too when the electron is shut down
//   }
//   if (process.platform !== 'darwin') {
//     app.quit();
//   }
// });

// app.on('activate', () => {
//   if (win === null) {
//     createWindow();
//   }
// });

const { app, BrowserWindow } = require('electron');
const path = require('path');
const { spawn } = require('child_process');

const keyPath = path.join(__dirname, 'googleCloud/static-groove-395514-8415acddf61d.json');
process.env.GOOGLE_APPLICATION_CREDENTIALS = keyPath;

let win;
let backendProcess;

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    }
  });

  win.loadURL(`file://${path.join(app.getAppPath(), 'build/index.html')}`);
  // win.webContents.openDevTools();

  win.on('closed', () => {
    win = null;
  });
}

app.on('ready', () => {
  backendProcess = spawn('java', ['-jar', path.join(__dirname, 'server/mybaitsplusDemo-0.0.1-SNAPSHOT.jar')], {
    env: {
      ...process.env,
      GOOGLE_APPLICATION_CREDENTIALS: keyPath
    }
  });
  
  backendProcess.stdout.on('data', (data) => {
    console.log(`Backend Output: ${data}`);
  });
  
  backendProcess.stderr.on('data', (data) => {
    console.error(`Backend Error: ${data}`);
  });
  
  createWindow();
});

app.on('window-all-closed', () => {
  if (backendProcess) {
    backendProcess.kill();
  }
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});

