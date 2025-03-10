/**
 * Arquivos de pré carregamento e reforço de segurança na comunicação entre processos
 */

const { contextBridge, ipcRenderer } = require('electron');

// Expor (autorizar a comunicação entre os processos)
contextBridge.exposeInMainWorld('api', {
    clientWindow: () => ipcRenderer.send('client-window'),
    osWindow: () => ipcRenderer.send('os-window'),
    funcionariosWindow: () => ipcRenderer.send('funcionarios-Window')
});
