console.log("processo Principal")
console.log(`Electron: ${process.versions.electron}`)


const { app, BrowserWindow, nativeTheme, Menu, ipcMain } = require('electron')
// essa linha esta relacionada ao preload.js
const path = require('node:path');

// importação dos metodos conectar e desconectar (modulo de conexão)
const { conectar, desconectar } = require('./database.js')

// importacão do Schema Cliente da camada model
const clienteModel = require ('./src/models/Clientes.js')






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






  ipcMain.on('funcionarios-window', () => {
    funcionariosWindow()
  })




}

// janela sobre
const aboutwindow = () => {
  const about = new BrowserWindow({
    width: 360,
    height: 220,
    icon: './src/img/pc.png',
    autoHideMenuBar: true,
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
      icon: './src/public/img/pc.png',
      autoHideMenuBar: true,
      resizable: false,
      parent: father,
      modal: true

    })
    child.loadFile('./src/views/child.html')

  }
}


let client
function clientWindow() {
  nativeTheme.themeSource = 'light'
  const main = BrowserWindow.getFocusedWindow()
  if (main) {
    client = new BrowserWindow({
      width: 1010,
      height: 720,
      // autoHideMenuBar: true,
      icon: './src/public/img/chave-inglesa.png',
      ///resizable: false,
      parent: main,
      modal: true,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js')
      }
    })
  }
  client.loadFile('./src/views/child.html')
  client.center()
}


let os
function osWindow() {
  nativeTheme.themeSource = 'light'
  const main = BrowserWindow.getFocusedWindow()
  if (main) {
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




let funcionarios
function funcionariosWindow() {
  nativeTheme.themeSource = 'light'
  const main = BrowserWindow.getFocusedWindow()
  if (main) {
    funcionarios = new BrowserWindow({
      width: 1010,
      height: 720,
      // autoHideMenuBar: true,
      icon: './src/public/img/automotivo.png',
      resizable: false,

      parent: main,
      modal: true
    })
  }
  funcionarios.loadFile('./src/views/funcionarios.html')
  funcionarios.center()
}



let motor
function motorWindow() {
  nativeTheme.themeSource = 'light'
  const main = BrowserWindow.getFocusedWindow()
  if (main) {
    motor = new BrowserWindow({
      width: 1010,
      height: 720,
      // autoHideMenuBar: true,
      icon: './src/public/img/automotivo.png',
      resizable: false,

      parent: main,
      modal: true
    })
  }
  motor.loadFile('./src/views/motor.html')
  motor.center()
}



let veiculos
function veiculosWindow() {
  nativeTheme.themeSource = 'light'
  const main = BrowserWindow.getFocusedWindow()
  if (main) {
    veiculos = new BrowserWindow({
      width: 1010,
      height: 720,
      // autoHideMenuBar: true,
      icon: './src/public/img/automotivo.png',
      resizable: false,

      parent: main,
      modal: true
    })
  }
  veiculos.loadFile('./src/views/veiculos.html')
  veiculos.center()
}








// iniciar aplicação
app.whenReady().then(() => {
  createWindow()
  //aboutwindow()
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





// iniciar a conexão com o banco de dados
ipcMain.on('db-connect', async (event) => {
  let conectado = await conectar()
  // se conectado for igual a true
  if (conectado) {
    setTimeout(() => {
      event.reply('db-status', "conectado")
    }, 500)


  }
})



//  Importante ! Desconectar do banco de dados quando a aplicçõ for encerrada
app.on('before-quit', () => {
  desconectar()
})

// template do menu

const template = [
  {
    label: 'Cadastrar',
    submenu: [
      {
        label: 'Clientes',
        click: () => clientWindow()
      },
      {
        label: 'Os',
        click: () => osWindow()
      },

      {
        label: 'Funcionarios',
        click: () => funcionariosWindow()
      },



      {
        label: 'Cadastro Do motor',
        click: () => motorWindow()
      },

      {
        label: 'Cadastro de Veiculos',
        click: () => veiculosWindow()
      },



      {
        type: 'separator'
      },
      {
        label: 'Sair',
        click: () => app.quit(),
        accelerator: 'ALT+F4'
      }

    ]
  },


  {
    label: ' Relatorios',
    submenu: [



      {
        label: 'Clientes',

      },
      {
        label: 'OS abertas',


      },

      {
        label: 'OS concluidas',
      }











    ]
  },


  {
    label: '  Arquivo',
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
        label: 'Recarregar',
        role: 'reload'
      },
      {
        label: 'Ferramentas do desenvolvedor',
        role: 'toggleDevTools' /* Exbir a tela de desenvolvimento */
      },
      {
        type: 'separator' /* crua uma linha para separar grupos do submenu */
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
        type: 'separator'
      },
      {
        label: 'sobre',
        click: () => aboutwindow()
      }
    ]
  }
]



  // recebimento dos pedidos  do renderizador para a abertura das janelas
  ipcMain.on('client-window', () => {
    clientWindow()
  })

  ipcMain.on('os-window', () => {
    osWindow()
  })

  ipcMain.on('motor-window', () => {
    motorWindow()
  })

  ipcMain.on('veiculos-window', () => {
    veiculosWindow()
  })

  // ================================
  // == clientes - CRUD Create
  // recebimento do objeto que contém os dados do cliente
  ipcMain.on('new-client', async (event, client) => {
    // importante! Teste de recebimento dos dados do cliente
    console.log(client)
    // Cadastrar a estrutura de dados no banco de dados MongoDB
    try{
      // criar uma nova estrutura de dados usando a classe modelo
      // modelo. Atenção os atributos precisam ser identicos
      // ao modelo de dados do clientes.js e os valores são definidos pelo conteúdo do objeto cliente
      const newClient = new clienteModel({
        nomeCliente: client.nameCli,
        cpfCliente:  client.cpfCli,
        emailCliente: client.emailCli,
        foneCliente: client.phoneCli,
        cepCliente:   client.cepCli,
        logradouroCliente:  client. logradouroCli,
        numeroCliente:   client.numeroCli,
        complementoCliente: client.  complementCli,
        bairroCliente: client. bairroCli,
        cidadeCliente: client.  cidadeCli,
        ufCli: client. ufCli,

   
      })
      // salvar os dados do cliente no banco de dados
      await newClient.save()
    
     
      
    } catch(error) {
      console.log(error)
    }

  })



  // fim - clientes - crud create
  // ==================================


  // 


  ipcMain.on('new-os', async (event,os)=>{
    console.log(os)
    try {
      const newOs = new clienteModel({
     
        numeroOS: os.buscar,
        dataOS: os.cliente,
        nomeClienteOS: os.phone,
        cpfClienteOS: os.cpf,
        telefoneClienteOS: os.data,
      status: os.conclusao,
     funcionarioResponsavelOS: os.status,
        modeloVeiculoOS: os.receber,
        placaVeiculoOS: os.pecas,
      anoVeiculoOS: os.acessorios,
       corVeiculoOS: os.total,
        formasPagamento: os.formasPagamento
         
  
      })
        await  newOs.save()
    } catch (error) {
      console.log(error)
    }
  })