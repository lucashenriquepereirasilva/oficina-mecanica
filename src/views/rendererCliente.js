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
let buscarOS = document.getElementById("buscaCliente")
let nomeOs = document.getElementById("nomeCliente")
let phoneOs = document.getElementById("telefoneCliente")
let numS = document.getElementById("cpfCnpjCliente")
let descrition = document.getElementById("descricaoServico")
let servico = getElementById("dataInicioServico")
let previsao = getElementById("inputprevisaoClient")
let conclu = getElementById("dataConclusaoServico")
let stat = getElementById("statusServico")
let pag = getElementById("formaPagamento")


// reset form
function resetForm(){
  // limpa os campos e resetar o formulario com as configuracoes
  location.reload
}


recebimento
api.resetForm((args) => {
  resetForm()
})

// === Função para aplicar máscara no CPF ===
function aplicarMascaraCPF(campo) {
  let cpf = campo.value.replace(/\D/g, ""); // Remove caracteres não numéricos

  if (cpf.length > 3) cpf = cpf.replace(/^(\d{3})(\d)/, "$1.$2");
  if (cpf.length > 6) cpf = cpf.replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3");
  if (cpf.length > 9) cpf = cpf.replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4");

  campo.value = cpf;
}

// === Função para validar CPF ===
function validarCPF() {
  let campo = document.getElementById('inputCPFClient');
  let cpf = campo.value.replace(/\D/g, ""); // Remove caracteres não numéricos

  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
      campo.style.borderColor = "red";
      campo.style.color = "red";
      return false;
  }

  let soma = 0, resto;

  for (let i = 1; i <= 9; i++) soma += parseInt(cpf[i - 1]) * (11 - i);
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf[9])) {
      campo.style.borderColor = "red";
      campo.style.color = "red";
      return false;
  }

  soma = 0;
  for (let i = 1; i <= 10; i++) soma += parseInt(cpf[i - 1]) * (12 - i);
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf[10])) {
      campo.style.borderColor = "red";
      campo.style.color = "red";
      return false;
  }

  campo.style.borderColor = "green";
  campo.style.color = "green";
  return true;
}

// Adicionar eventos para CPF
cpfClient.addEventListener("input", () => aplicarMascaraCPF(cpfClient)); // Máscara ao digitar
cpfClient.addEventListener("blur", validarCPF); // Validação ao perder o foco



// == CRUD Creat/Update ==================================

// Evento associado ao botão submit (uso das validações do html)
frmClient.addEventListener('submit', async (event) =>{
  //evitar o comportamento padrao do submit que é enviar os dados do formulario e reiniciar o documento html
  event.preventDefault()
  //Teste importante ( recebimento dos dados do formulario - passo 1 do fluxo)
  console.log(nameClient.value, cpfClient.value, emailClient.value, telefoneClient.value, cepClient.value, AddressClient.value, numeroClient.value, ComplementClient.value, bairroClient.value, CityClient.value, ufClient.value);

  // Limpa o CPF antes de salvar no banco
  let cpfSemFormatacao = cpfClient.value.replace(/\D/g, "");

  // Criar um objeto para armazenar os dados do cliente amtes de enviar ao main
  const client = {
      nameCli: nameClient.value,
      cpfCli: cpfSemFormatacao,
      emailCli: emailClient.value,
      telefoneCli: telefoneClient.value,
      cepCli: cepClient.value,
      AddressCli: AddressClient.value,
      numeroCli: numeroClient.value,
      ComplementCli: ComplementClient.value,
      bairroCli: bairroClient.value,
      CityCli: CityClient.value,
      ufCli: ufClient.value
  }
  // Enviar ao main o objeto client - (Passo 2: fluxo)
  // uso do preload.js
  api.newClient(client)
}) 

// == fim CRUD Creat/Update ==============================



// fim reset form




