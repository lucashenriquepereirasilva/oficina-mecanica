/**
 * Processo de renderização
 */

console.log("processo de renderização");

function client() {
    api.clientWindow();
}

function os() {
    api.osWindow();
}

function funcionarios() {
    api.funcionariosWindow();
}

function veiculos() { // Mudança aqui: "veiculos" minúsculo para corresponder ao preload.js
    api.veiculosWindow();
}

function motor() { // Mudança aqui: "veiculos" minúsculo para corresponder ao preload.js
    api.motor();
}



