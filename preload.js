/**
 * Arquivos de pré carregamento e reforço de segurança na comunicação entre processos
 */

const { contextBridge, ipcRenderer } = require('electron')

// Enviar ao main um pedido de conexão com o banco de dados do icone no processo de renderização(index.html - rendeder.html)
ipcRenderer.send('db-connect')

// Expor (autorizar a comunicação entre os processos)
contextBridge.exposeInMainWorld('api', {
    clientWindow: () => ipcRenderer.send('client-window'),
    osWindow: () => ipcRenderer.send('os-window'),
    funcionariosWindow: () => ipcRenderer.send('funcionarios-window'),
    veiculosWindow: () => ipcRenderer.send('veiculos-window'),
    motorWindow: () => ipcRenderer.send('motor-window'),
    dbStatus: (message) => ipcRenderer.on('db-status', message)

})

    function dbStatus(message){
        ipcRenderer.on('db-status', message)
    }

   


