/**
 * Processo de renderização
 */

console.log("processo de renderização")

function client() {
    api.clientWindow()
}

function os() {
    api.osWindow()
}

function funcionarios() {
    api.funcionariosWindow()
}


function motor() { // Mudança aqui: "veiculos" minúsculo para corresponder ao preload.js
    api.motorWindow()
}

function veiculos() { // Mudança aqui: "veiculos" minúsculo para corresponder ao preload.js
    api.veiculosWindow()
}



//  Trocar o icone do banco de dados
api.dbStatus((event,message)=>{
    // teste  do recebimento do message
    console.log(message)
    if (message === "conectado") {
        document.getElementById('statusdb').src = "../public/img/dbon.png"
    }else{
        document.getElementById('statusdb').src = "../public/img/dboff.png"
    }
})



