document.addEventListener('DOMContentLoaded', () => {
  // Captura dos elementos do DOM
 let foco = document.getElementById('searchClient');
 let frmClient = document.getElementById('frmClient');
 let nameClient = document.getElementById('inputNameClient');
 let cpfClient = document.getElementById('inputCPFClient');
 let emailClient = document.getElementById('inputEmailClient');
 let telefoneClient = document.getElementById('inputTelefoneClient');
 let cepClient = document.getElementById('inputCEPClient');
 let logradouroClient = document.getElementById('inputAddressClient');
 let numeroClient = document.getElementById('inputNumeroClient');
 let complementClient = document.getElementById('inputComplementClient');
 let bairroClient = document.getElementById('inputBairroClient');
 let cidadeClient = document.getElementById('inputCidadeClient');
 let ufClient = document.getElementById('inputUFclient');

  const id = document.getElementById('idClient')
  
  // Desativa os botões de update e delete no início
  let btnUpdate = document.getElementById('btnUpdate');
  let btnDelete = document.getElementById('btnDelete');
  btnUpdate.disabled = true;
  btnDelete.disabled = true;

  // Foco na busca do cliente
  foco.focus();
  
  // Função de buscar CEP
  function buscarCEP() {
    let cep = cepClient.value;
    let urlAPI = `https://viacep.com.br/ws/${cep}/json/`;
    
    fetch(urlAPI)
      .then(response => response.json())
      .then(dados => {
        document.getElementById('inputAddressClient').value = dados.logradouro;
        document.getElementById('inputBairroClient').value = dados.bairro;
        document.getElementById('inputCidadeClient').value = dados.localidade;
        document.getElementById('inputUFclient').value = dados.uf;
      })
      .catch(error => console.log(error));
  }

  // Função para a tecla Enter
  function teclaEnter(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      buscarCliente();
    }
  }

  // Evento para restaurar a tecla Enter
  function restaurarEnter() {
    frmClient.removeEventListener('keydown', teclaEnter);
  }

  // Função para resetar o formulário
  function resetF() {
    location.reload();
  }

  // Escuta o evento do botão de submit
  frmClient.addEventListener('submit', async (event) => {
    event.preventDefault();


    if(id.value === "") {
      // executar o método para cadastrar um cliente
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
  
      console.log("Dados do Cliente:", client);
  
      // Enviar os dados ao backend
      api.newClient(client);
    } else {
      // executar o método para alterar os dados do cliente
        // executar o método para cadastrar um cliente

        // criar um objeto para armazenar dados
        const client = {
          idCli: id.value,
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
    }
      
      // Enviar os dados ao backend
      api.UpdateClient(client);

   
  });

  // Função para validar CPF
  function validarCPF() {
    let cpf = cpfClient.value.replace(/\D/g, ""); 

    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
      cpfClient.style.borderColor = "red";
      cpfClient.style.color = "red";
      return false;
    }

    let soma = 0, resto;
    for (let i = 1; i <= 9; i++) soma += parseInt(cpf[i - 1]) * (11 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf[9])) {
      cpfClient.style.borderColor = "red";
      cpfClient.style.color = "red";
      return false;
    }

    soma = 0;
    for (let i = 1; i <= 10; i++) soma += parseInt(cpf[i - 1]) * (12 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf[10])) {
      cpfClient.style.borderColor = "red";
      cpfClient.style.color = "red";
      return false;
    }

    cpfClient.style.borderColor = "green";
    cpfClient.style.color = "green";
    return true;
  }

  // Função para aplicar a máscara no CPF
  function aplicarMascaraCPF(campo) {
    let cpf = campo.value.replace(/\D/g, "");
    if (cpf.length > 3) cpf = cpf.replace(/^(\d{3})(\d)/, "$1.$2");
    if (cpf.length > 6) cpf = cpf.replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3");
    if (cpf.length > 9) cpf = cpf.replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4");
    campo.value = cpf;
  }

  // Adicionar eventos para CPF
  cpfClient.addEventListener("input", () => aplicarMascaraCPF(cpfClient));
  cpfClient.addEventListener("blur", validarCPF);

  
  function buscarCliente(){
    //console.log("teste do botão buscar")

    // Passo 1: Capturar o nome do cliente
    let name = document.getElementById('searchClient').value
    console.log(name) // teste do passo 1

    // validação do campo obrigatorio
    // se o campo de busca não for preenchido
    if (name === "") {
        // enviar ao main um pedido para alertar o usúario
        api.validateSearch()
        foco.focus()

    } else {
        api.searchName(name) // passo 2: envio do nome ao main
        // Recebimento dos dados do cliente 
        api.renderClient((event, dataClient) => {
            console.log(dataClient) // teste do passo 5
    
            // Passo 6: renderizar os dados do cliente no formulario
            // - Criar um vetor global para manipulação dos dados 
            // - Criar uma constante para converter os dados recebidos que estão no formato string para o formato JSON (JSON.parse)
            // usar o laço forEach para percorrer o vetor e setar o campo (caixas de texto) do formulario
            const dadosCliente = JSON.parse(dataClient)
            // atribuir ao vetor os dados do cliente
            arrayClient = dadosCliente
            // extrair os dados do cliente
            arrayClient.forEach((c) => {
              id.value = c._id,
                nameClient.value = c.nomeCliente,
                cpfClient.value = c.cpfCliente,
                emailClient.value = c.emailCliente,
                telefoneClient.value = c.foneCliente,    
                cepClient.value = c.cepCliente,
                AddressClient.value = c.logradouroCliente,
                numeroClient.value = c.numeroCliente,
                complementClient.value = c.complementoCliente,
                bairroClient.value = c.bairroCliente,
                CityClient.value = c.cidadeCliente,
                ufClient.value = c.ufCliente
                btnCreate.disabled= true
                btnDelete.disabled = false
                btnUpdate.disabled = false
            })
        })
    }
}

// setar o cliente não cadastrado (recortar do campo de busca e colar no campo nome)

/* api.setClient((args) => {
    // Criar uma variavel para armazenar um valor digitado no campo de busca (nome ou cpf)
    let campoBusca = document.getElementById('searchClient').value
    // Foco no campo de nome do cliente
    nameClient.focus()
    // remover o valor digitado no campo de busca
    foco.value = ""
    // preencher o campo de nome cliente com o nome da busca
    nameClient.value = campoBusca
}) */

api.setClient((args) => {
    let campoBusca = document.getElementById('searchClient').value.trim()

    // Regex para verificar se o valor é só número (CPF)
    if (/^\d{11}$/.test(campoBusca)) {
        // É um número → CPF
        cpfClient.focus()
        foco.value = ""
        cpfClient.value = campoBusca
    } 
    else if(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(campoBusca)){
        cpfClient.focus()
        foco.value = ""
        cpfClient.value = campoBusca
    }
    else {
        // Não é número → Nome
        nameClient.focus()
        foco.value = ""
        nameClient.value = campoBusca
    }
})

function excluirCliente(){
  console.log(id.value) //  passo 1 receber do form  o id do cliete
  api.deleteClient(id.value)
}

    
// == Reset form ==============================================
function resetF() {
  // Limpar os campos e resetar o formulário com as configurações pré definidas
  location.reload()
}


  // Reset form
  api.resetF((args) => {
    resetF();
  });
});

