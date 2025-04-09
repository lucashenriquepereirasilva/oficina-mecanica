//captura dos dados dos inputs do formulario (passo 1 do fluxo)
let frmOS = document.getElementById('frmOS')
let descricaoOS = document.getElementById('serviceDescription')
let dataOS = document.getElementById('inputconclusãoClient')
let orcamentoOS = document.getElementById('inputOrcamentoClient')
let pagamentoOS = document.getElementById('inputpagamentoClient')
let statusOS = document.getElementById('osStatus')

// =======================================================
// == CRUD Creat/Update ==================================

// Evento associado ao botão submit (uso das validações do html)
frmOS.addEventListener('submit', async (event) =>{
    //evitar o comportamento padrao do submit que é enviar os dados do formulario e reiniciar o documento html
    event.preventDefault()
    //Teste importante ( recebimento dos dados do formulario - passo 1 do fluxo)
    console.log(descricaoOS.value, dataOS.value, orcamentoOS.value, pagamentoOS.value, statusOS.value) 

    // Criar um objeto para armazenar os dados do cliente amtes de enviar ao main
    const os = {
        desOS: descricaoOS.value,
        datOS: dataOS.value,
        orcOS: orcamentoOS.value,
        pagOS: pagamentoOS.value,
        staOS: statusOS.value
    }
    // Enviar ao main o objeto client - (Passo 2: fluxo)
    // uso do preload.js
    api.newos(os);

}) 

// == fim CRUD Creat/Update ==============================
// =======================================================


// reset form
function resetF(){
    // limpa os campos e resetar o formulario com as configuracoes
    location.reload()
  }
  
  
  api.resetF((args) => {
    console.log("teste de recebimento")
   resetF()
  })
  

