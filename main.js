console.log("processo Principal")
console.log(`Electron: ${process.versions.electron}`)


const { app, BrowserWindow, nativeTheme, Menu, ipcMain, dialog, shell } = require('electron')
// essa linha esta relacionada ao preload.js
const path = require('node:path');

// importação dos metodos conectar e desconectar (modulo de conexão)
const { conectar, desconectar } = require('./database.js')

// importacão do Schema Cliente da camada model
const clienteModel = require('./src/models/Clientes.js');

const osModel = require('./src/models/OS.js')

const carroModel = require('./src/models/carrosOS.js')
// importação do pacote jspdf

const { jspdf, default: jsPDF } = require('jspdf')

// importação da biblioteca fs(nativa do javascript) para a manipulação de arquivos
const fs = require('fs')









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
      modal: true,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js')
      }
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
      height: 520,
      // autoHideMenuBar: true,
      icon: './src/public/img/automotivo.png',
      resizable: false,

      parent: main,
      modal: true,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js')
      }
    })
  }
  veiculos.loadFile('./src/views/veiculos.html')
  veiculos.center()
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
        click: () => relatorioClientes()

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



//recebimento dos pedidos  do renderizador para a abertura das janelas
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
  try {
    // criar uma nova estrutura de dados usando a classe modelo
    // modelo. Atenção os atributos precisam ser identicos
    // ao modelo de dados do clientes.js e os valores são definidos pelo conteúdo do objeto cliente
    const newClient = new clienteModel({
      nomeCliente: client.nameCli,
      cpfCliente: client.cpfCli,
      emailCliente: client.emailCli,
      foneCliente: client.phoneCli,
      cepCliente: client.cepCli,
      logradouroCliente: client.logradouroCli,
      numeroCliente: client.numeroCli,
      complementoCliente: client.complementCli,
      bairroCliente: client.bairroCli,
      cidadeCliente: client.cidadeCli,
      ufCli: client.ufCli,


    })
    // salvar os dados do cliente no banco de dados
    await newClient.save()
    // mensagem  de confirmação
    dialog.showMessageBox({
      type: 'info',
      title: "Aviso",
      message: "cliente adicionado com sucesso",
      buttons: ['OK']
    }).then((result) => {
      // acão pressionar o botão
      if (result.response === 0) {


        // enviar um pedido para o renderizador limpar os dados
        event.reply('reset-f')
      }

    })



  } catch (error) {
    // se o codigo de erro for 11000  (cpf duplicado) enviar uma mensagem ao usuario
    if (error.code === 11000) {
      dialog.showMessageBox({
        type: 'error',
        title: "Atenção!",
        message: "CPF Já está cadastrado\n verifique de digitou corretamente",
        buttons: ['OK'],
      }).then((result) => {
        if (result.response === 0) {
          //limpar a caixa de input do cpf, focar essa caixa e deixar a borda em vermelho


        }


      })
    }
    console.log(error)
  }


})








// fim - clientes - crud create
// ==================================


//  =================
async function relatorioClientes() {
  try {
    const clientes = await clienteModel.find().sort({ nomeCliente: 1 });
    const doc = new jsPDF('p', 'mm', 'a4');

    // Inserir imagem no cabeçalho do PDF
    const imagePath = path.join(__dirname, 'src', 'public', 'img', 'ds.png');
    const imageBase64 = fs.readFileSync(imagePath, { encoding: 'base64' });

    doc.addImage(imageBase64, 'PNG', 5, 8);

    doc.setFontSize(18);
    doc.text("Relatório de Clientes", 14, 50);

    // Inserir data atual
    const dataAtual = new Date().toLocaleDateString('pt-BR');
    doc.setFontSize(12);
    doc.text(`Data: ${dataAtual}`, 160, 10);

    let y = 60;
    doc.text("Nome", 14, y);
    doc.text("Telefone", 80, y);
    doc.text("Email", 130, y);
    y += 5;

    doc.setLineWidth(0.5);
    doc.line(10, y, 200, y);
    y += 10;

    // Renderizar clientes cadastrados
    clientes.forEach((c, index) => {
      if (y > 280) {
        doc.addPage();
        y = 20;

        doc.text("Nome", 14, y);
        doc.text("Telefone", 80, y);
        doc.text("Email", 130, y);
        y += 5;

        doc.setLineWidth(0.5);
        doc.line(10, y, 200, y);
        y += 10;
      }

      // Garantindo que os valores são strings válidas
      const nomeCliente = c?.nomeCliente ? String(c.nomeCliente) : "N/A";
      const foneCliente = c?.foneCliente ? String(c.foneCliente) : "N/A";
      const emailCliente = c?.emailCliente ? String(c.emailCliente) : "N/A";

      doc.text(nomeCliente, 14, y);
      doc.text(foneCliente, 80, y);
      doc.text(emailCliente, 130, y);

      y += 10;
    });

    // Adicionar numeração de páginas
    const paginas = doc.internal.getNumberOfPages();
    for (let i = 1; i <= paginas; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.text(`Página ${i} de ${paginas}`, 105, 290, { align: 'center' });
    }

    // Salvar arquivo temporário
    const tempDir = app.getPath('temp');
    const filePath = path.join(tempDir, 'clientes.pdf');

    doc.save(filePath);
    shell.openPath(filePath);
  } catch (error) {
    console.error("Erro ao gerar o relatório:", error);
  }
}

// ==========================================
// == OS - CRUD Create ================
// recebimento do objeto que contem os dados do cliente
ipcMain.on('new-os', async (event, OS) => {
  // Importante! Teste de recebimento dos dados do cliente
  console.log(os)
  // console.log("teste")
  // cadastrar a estrutura de dados no banco de dados usando a classe modelo. Atenção!! os atributos precisam ser identicos ao modelo de dados Clientes.js eos valores sao definidos pelo conteudo do objeto cliente 
  try {
    const newOS = new osModel({
      descricaoOS: OS.desOS,
      materialOS: OS.matOS,
      dataOS: OS.datOS,
      orcamentoOS: OS.orcOS,
      pagamentoOS: OS.pagOS,
      statusOS: OS.staOS
    })
    // salvar os dados do cliente no banco de dados
    await newOS.save()
    //Mensagem de confirmação
    dialog.showMessageBox({
      //Customização
      type: 'info',
      title: "Aviso",
      message: "OS adicionado com sucesso",
      buttons: ['OK']
    }).then((result) => {
      //ação ao precionar o botão 
      if (result.response === 0) {
        // enviar um pedido para o renderizador limpar os campos e resetar as 
        // configurações pré definidas (rótulo) preload.js
        event.reply('reset-form')
      }

    })

  } catch (error) {
    console.log(error)
  }
})


// ========== crud delete =====================

ipcMain.on('delete-client',async (event, id)=> {
  console.log(id) // teste do botao
  try {
    // importante - confirmar a exclusão
    // client é o nome da variavel que representa a janela
    const response =  await dialog.showMessageBox(client, {
      type: 'warning',
      title: 'Atenção',
      message: " Deseja  Excluir este cliente:\nEsta ação  não podera ser desfeita",
      buttons: ['Cancelar', 'Excluir'] // [ 0, 1]
    })
    if (response === 1) {
      // passo 3 excluir registro de clientes
      const delClient = await clienteModel.findByIdAndDelete(id)
      event.reply('reset-f')
    }

  } catch (error){
    console.log(error)
  }
})
// -- Fim - OS - CRUD Create ===========
// ==========================================

// ==========================================
// == Veiculo - CRUD Create ================
// recebimento do objeto que contem os dados do cliente
ipcMain.on('new-carro', async (event, car) => {
  // Importante! Teste de recebimento dos dados do cliente
  console.log(car)
  // cadastrar a estrutura de dados no banco de dados usando a classe modelo. Atenção!! os atributos precisam ser identicos ao modelo de dados Clientes.js eos valores sao definidos pelo conteudo do objeto cliente 
  try {
    const newCarro = new carroModel({
      proprietarioCarro: car.proCar,
      marcaCarro: car.marCar,
      modeloCarro: car.modCar,
      anoCarro: car.anoCar,
      placaCarro: car.plaCar,
      corCarro: car.corCar,
      chassiCarro: car.chasCar
    })
    // salvar os dados do cliente no banco de dados
    await newCarro.save()
    // mensagem  de confirmação
    dialog.showMessageBox({
      type: 'info',
      title: "Aviso",
      message: "Carro adicionado com sucesso",
      buttons: ['OK']
    }).then((result) => {
      // acão pressionar o botão
      if (result.response === 0) {


        // enviar um pedido para o renderizador limpar os dados
        event.reply('reset-f')
      }

    })


  } catch (error) {
    console.log(error)
  }
})
// -- Fim - Veiculo - CRUD Create ===========
// ==========================================


// ==========================================
// == CRUD Read =============================




// Validação de busca (preenchimento obrigatorio)
ipcMain.on('validate-search', () => {
  dialog.showMessageBox({
    type: 'warning',
    title: 'Atenção',
    message: 'Preencha o campo de busca',
    buttons: ['OK']
  })
})


ipcMain.on('search-name', async(event, name) => {
  //console.log("teste IPC search-name") Dica para testar o funcionamento
  //console.log(name) // teste do passo 2 (importante)

  // passos 3 e 4 busca dos dados do cliente do banco
  //find({nomeCliente: name}) - busca pelo nome
  //RegExp(name, i) - (insensitive / Ignorar maiúsculo ou minúsculo)
  try{
    /*const dataClient = await clientModel.find({
      nomeCliente: new RegExp(name, 'i')
    })*/
      const dataClient  = await clientModel.find({
        $or: [
          { nomeCliente: new RegExp(name, 'i') },
          { cpfCliente: new RegExp(name, 'i') }
        ]
      })
    console.log(dataClient) // teste passo 3 e 4 (Importante!)

    // melhoria d eexperiencia do usuario (se o cliente nao estiver cadastrado, alertar o usuario e questionar se ele
    // quer cadastrar este novo cliente. Se não quiser cadastrar, limpar os campos, se quiser cadastrar recortar o nome do cliente do campo de busca e colar no campo nome)

    // se o vetor estiver vazio []
    if(dataClient.length === 0) {
      dialog.showMessageBox({
        type: 'warning',
        title: "Aviso",
        message: "Cliente não cadastrado.\nDeseja cadastra-lo",
        defaultId: 0, //botão 0
        buttons: ['Sim', 'Não'] // [0, 1]
      }).then((result) => {
        if (result.response === 0) {
          // enviar ao renderizador um pedido para setar os campos (recortar do campo de busca e colocar no campo nome)
          event.reply('set-client')
        } else {
          // limpar o formulário
          event.reply('reset-form')
        }
      })
    }

    // Passo 5: 
    // enviando os dados do cliente ao rendererCliente
    // OBS: IPC só trabalha com string, então é necessario converter o JSON para string JSON.stringify(dataClient)
    event.reply('renderClient', JSON.stringify(dataClient))

  }catch (error) {
    console.log (error)
  }
})


// ========================== CRUD UPDATE

ipcMain.on('update-client', async (event, client)=> {
  console.log(client) //  teste importante ( recebimentos de dados dos cliente)
  try {
 // criar uma nova estrutura de dados usando a classe modelo
    // modelo. Atenção os atributos precisam ser identicos
    // ao modelo de dados do clientes.js e os valores são definidos pelo conteúdo do objeto cliente
    const updateClient = await clienteModel. findByIdAndUpdate(
      client.idCli,
      {
      nomeCliente: client.nameCli,
      cpfCliente: client.cpfCli,
      emailCliente: client.emailCli,
      foneCliente: client.phoneCli,
      cepCliente: client.cepCli,
      logradouroCliente: client.logradouroCli,
      numeroCliente: client.numeroCli,
      complementoCliente: client.complementCli,
      bairroCliente: client.bairroCli,
      cidadeCliente: client.cidadeCli,
      ufCli: client.ufCli,
          

    },
    {
      new: true
    }
)
// confirmação

 //Mensagem de confirmação
 dialog.showMessageBox({
  //Customização
  type: 'info',
  title: "Aviso",
  message: "Dados Atualizados com sucesso ",
  buttons: ['OK']
}).then((result) => {
  //ação ao precionar o botão 
  if (result.response === 0) {
    // enviar um pedido para o renderizador limpar os campos e resetar as 
    // configurações pré definidas (rótulo) preload.js
    event.reply('reset-form')
  }

})


  } catch (error) {
    console.log(error)
  }
})
