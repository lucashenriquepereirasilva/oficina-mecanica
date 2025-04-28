/**
 * Arquivos de pré carregamento e reforço de segurança na comunicação entre processos
 */

const { contextBridge, ipcRenderer } = require('electron')
const { validate } = require('./src/models/Clientes')

// Enviar ao main um pedido de conexão com o banco de dados do icone no processo de renderização(index.html - rendeder.html)
ipcRenderer.send('db-connect')

// Expor (autorizar a comunicação entre os processos)
contextBridge.exposeInMainWorld('api', {
    clientWindow: () => ipcRenderer.send('client-window'),
    osWindow: () => ipcRenderer.send('os-window'),
    funcionariosWindow: () => ipcRenderer.send('funcionarios-window'),
    veiculosWindow: () => ipcRenderer.send('veiculos-window'),
    motorWindow: () => ipcRenderer.send('motor-window'),
    dbStatus: (message) => ipcRenderer.on('db-status', message),
    newClient: (client) => ipcRenderer.send('new-client', client),
    resetF: (args) => ipcRenderer.on('reset-f',args),
    newos: (os) => ipcRenderer.send('new-os', os),
    NewCarro: (car) => ipcRenderer.send('new-carro', car),
    searchName: (name) => ipcRenderer.send('search-name', name),
    renderClient: (dataClient) => ipcRenderer.on('renderClient', dataClient),
    validateSearch: () => ipcRenderer.send('validate-search'),
    setClient: (args) => ipcRenderer.on ('set-client', args),
    deleteClient: (id) => ipcRenderer.send('delete-client', id) 
  

    
})

    function dbStatus(message){
        ipcRenderer.on('db-status', message)
    }

   


