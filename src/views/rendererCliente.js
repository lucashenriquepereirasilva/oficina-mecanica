// Buscar CEP

function buscarCEP() {
  // console.log("teste do evento blur")
  let cep = document.getElementById('inputCEPClient').value
  // console.log(cep) teste de recebimento do CEP
  // Consumir a API do VIACEP
  let urlAPI = `https://viacep.com.br/ws/${cep}/json/`
  // acessando o web service para obter os dados
  fetch(urlAPI)
    .then(response => response.json())
    .then(dados => {
      //extração dos dados
      document.getElementById('inputAddressClient').value = dados.logradouro
      document.getElementById('inputBairroClient').value = dados.bairro
      document.getElementById('inputCidadeClient').value = dados.localidade
      document.getElementById('inputUFclient').value = dados.uf


    })
    .catch(error => console.log(error))
}

// capturar o foco na busca pelo nome do cliente
// a constante foco obtem o elemento html (input) indentificado como 'searchCliente'

const foco = document.getElementById('searchClient')


// inciar a janela cliente alterando as propriedades de alguns elementos
document.addEventListener('DOMContentLoaded', () => {
  // desativar os botôes
  btnUpdate.disabled = true
  btnDelete.disabled = true

  //foco na busca do cliente
  foco.focus()
})

// captura dos dados  dos inputs dos formularios (passo 1 : fluxo)
let frmClient = document.getElementById('frmClient')
let nameClient = document.getElementById('inputNameClient')
let cpfClient = document.getElementById('inputCPFClient')
let emailClient = document.getElementById('inputEmailClient')
let telefoneClient = document.getElementById('inputTelefoneClient')
let cepClient = document.getElementById('inputCEPClient')
let logradouroClient = document.getElementById('inputAddressClient')
let numeroClient = document.getElementById('inputNumeroClient')
let complementClient = document.getElementById('inputComplementClient')
let bairroClient = document.getElementById('inputBairroClient')
let cidadeClient = document.getElementById('inputCidadeClient')
let ufClient = document.getElementById('inputUFclient')






// ================================================================
// CRUD Create / Update ============================================

// Evento associado ao botão submit
frmClient.addEventListener('submit', async (event) => {
  event.preventDefault(); // Evita o recarregamento da página

  // Criar um objeto pra armazenar os dados do cliente dentro do evento
  const client = {
    nameCli: nameClient.value,
    cpfCli: cpfClient.value,
    emailCli: emailClient.value,
    phoneCli: telefoneClient.value,
    cepCli: cepClient.value,
    logradouroCli: logradouroClient.value,
    numeroCli: numeroClient.value,
    complementCli: complementClient.value,
    bairroCli: bairroClient.value,
    cidadeCli: cidadeClient.value,
    ufCli: ufClient.value
  };

  // Exibir no console para verificar se os dados estão sendo capturados corretamente
  console.log("Dados do Cliente:", client);

  // Enviar os dados ao backend via preload.js
  api.newClient(client);
});

// enviar ao main o objeto client - (passo 2: fluxo)
// uso do preload.js


// == Fim CRUD Create/ Update


//os CRUD


//Pegar as informações da Os
let frmOS = document.getElementById("frmOrdemServico")
let BuscarOS = document.getElementById("buscaCliente")
let ClienteOS = document.getElementById("nomeCliente")
let PhoneOS = document.getElementById("telefoneCliente")
let cpfOS = document.getElementById("cpfCnpjCliente")
let ServicoOS = document.getElementById("descricaoServico")
let DataInicioOS = getElementById("dataInicioServico")
let ConclusaoOS = getElementById("dataConclusaoServico")
let StatusOS = getElementById("statusServico")
let PagamentoOS = getElementById("formaPagamento")
//===================================================================
frmOS.addEventListener("submit", async(event)=>{
    event.preventDefault()
    console.log(frmOS.value,BuscarOS.value,ClienteOS.value,PhoneOS.value,cpfOS.value,ServicoOS.value,DataInicioOS.value,ConclusaoOS.value, StatusOS.value,PagamentoOS.value)

    const os = {
        buscar: BuscarOS.value,
        cliente: ClienteOS.value,
        phone: PhoneOS.value,
        cpf: cpfOS.value,
        cor: ServicoOS.value,
        data: DataInicioOS.value,
        conclusao: ConclusaoOS.value,
        status: StatusOS.value,
        receber: PagamentoOS.value,
      
    }
    console.log("Dados do Cliente:", os);
    api.newOs(os)
    
  // Exibir no console para verificar se os dados estão sendo capturados corretamente

})