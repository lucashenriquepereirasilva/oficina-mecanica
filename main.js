 console.log("processo Principal")
console.log(`Electron: ${process.versions.electron}`)


const { app, BrowserWindow, nativeTheme ,Menu,  ipcMain} = require('electron')
// essa linha esta relacionada ao preload.js
const path = require('node:path');




// Janela principal
let win
const createWindow = () => {
nativeTheme.themeSource = 'dark'
   win = new BrowserWindow({
    width: 800,
    height: 600,
    resizable: false,
    icon: './src/img/pc.png',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
   // resizable: false   /* remover a ação de minimizar tela */
  // autoHideMenuBar: true, /* remover a ação de menu tela */
   //minimizable: false,
  
 })

 // menu personalizado 
Menu.setApplicationMenu(Menu.buildFromTemplate(template))

  win.loadFile('./src/views/index.html')


  // recebimento dos pedidos  do renderizador para a abertura das janelas
  ipcMain.on ('client-window', () => {
    clientwindow()
  })

  ipcMain.on ('os-window', () => {
   oswindow()
  })
}

// janela sobre
const aboutwindow = () => {
    const about = new BrowserWindow({
        width: 360,
        height: 220,
        icon: './src/img/pc.png',
        autoHideMenuBar:true,
        resizable: false
    })

    about.loadFile('./src/views/sobre.html')

}

// Janela secudaria

const childWindow = () => {
  const father = BrowserWindow.getFocusedWindow()
  if (father) {
    const child = new BrowserWindow({
      width: 640,
      height: 220,
      icon: './src/p/img/pc.png',
      autoHideMenuBar: true,
      resizable: false,
      parent: father,
      modal: true
      
    })
    child.loadFile('./src/views/child.html')
  
  }
}


let client
function clientwindow(){
  nativeTheme.themeSource = 'light'
  const main = BrowserWindow.getFocusedWindow()
  if(main) {
    client = new BrowserWindow({
      width: 1010,
      height: 720,
     // autoHideMenuBar: true,
      icon: './src/public/img/chave-inglesa.png',
      resizable: false,
      parent: main,
      modal: true
    })
  }
  client.loadFile('./src/views/child.html')
  client.center()
}


let os
function oswindow(){
  nativeTheme.themeSource = 'light'
  const main = BrowserWindow.getFocusedWindow()
  if(main) {
    os = new BrowserWindow({
      width: 1010,
      height: 720,
     // autoHideMenuBar: true,
      icon: './src/public/img/chave-inglesa.png',
      resizable: false,

      parent: main,
      modal: true
    })
  }
  os.loadFile('./src/views/os.html')
  os.center()
}





// iniciar aplicação
app.whenReady().then(() => {
  createWindow()
 // aboutwindow()
})


app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })



app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
  })

// reduzir logs

app.commandLine.appendSwitch('log-level', '3')
  

  // template do menu

  const template =[
    {
      label:'Cadastrar',
      submenu: [
          {
            label: 'Clientes',
            click: () => clientwindow()
          },
          {
              label: 'Os',
              click: () => oswindow()
          },
          {
            type:'separator' 
          },
          {
              label: 'Sair',
              click: () => app.quit(),
              accelerator: 'ALT+F4'
          }
  
      ]      
      },


      {
        label:' Relatorios',
        submenu: [
          


          {
            label: 'Clientes',
           
          },
            {
                label: 'OS abertas',


            },

         {
          label:  'OS concluidas',
         }


    


            

          

          
            
        ]      
    },
      
  
      {
          label:'  Arquivo',
          submenu: [
            


            {
              label: 'Janela Secundária',
              click: () => childWindow()
            },
              {
                  label: 'Sair',
                  click: () => app.quit(),
                  accelerator: 'ALT+F4'
              }
          ]      
      },

      {
          label: 'Exibir',
          submenu: [
              {
                  label:'Recarregar',
                  role:'reload'
              },
              {
                  label:'Ferramentas do desenvolvedor',
                  role:'toggleDevTools' /* Exbir a tela de desenvolvimento */
              },
              {
                  type:'separator' /* crua uma linha para separar grupos do submenu */
              },
              {
                  label: 'Aplicar zoom',
                  role: 'zoomIn'
              },
              {
                  label: 'Reduzir',
                  role: 'zoomOut'
              },
              {
                  label: 'Restaurar o zoom padrão',
                  role: 'ResetZoom'
              }
          ]      
      },
      {
          label: 'Ajuda',
          submenu: [
            {
              label: 'Docs',
              click: () => shell.openExternal('https://github.com/lucashenriquepereirasilva/Lucas.TI')
            },
            {
              type:'separator'
            },
            {
              label: 'sobre',
              click: () => aboutwindow ()
            } 
          ]
      }
  ]