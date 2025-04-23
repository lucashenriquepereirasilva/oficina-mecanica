document.addEventListener('DOMContentLoaded', () => {
  // Captura dos elementos do DOM
  const foco = document.getElementById('searchClient');
  const frmClient = document.getElementById('frmClient');
  const nameClient = document.getElementById('inputNameClient');
  const cpfClient = document.getElementById('inputCPFClient');
  const emailClient = document.getElementById('inputEmailClient');
  const telefoneClient = document.getElementById('inputTelefoneClient');
  const cepClient = document.getElementById('inputCEPClient');
  const logradouroClient = document.getElementById('inputAddressClient');
  const numeroClient = document.getElementById('inputNumeroClient');
  const complementClient = document.getElementById('inputComplementClient');
  const bairroClient = document.getElementById('inputBairroClient');
  const cidadeClient = document.getElementById('inputCidadeClient');
  const ufClient = document.getElementById('inputUFclient');
  
  // Desativa os botões de update e delete no início
  const btnUpdate = document.getElementById('btnUpdate');
  const btnDelete = document.getElementById('btnDelete');
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

  // Função para buscar cliente pelo nome
  function buscarCliente() {
    let name = document.getElementById('searchClient').value;

    if (name === "") {
      alert("Por favor, insira um nome para busca.");
    } else {
      api.searchName(name);  // Passo 2: envio do nome ao main
    }

    // Recebimento dos dados do cliente
    api.renderClient((event, dataClient) => {
      const dadosCliente = JSON.parse(dataClient);
      const arrayClient = dadosCliente;
      arrayClient.forEach((c) => {
        nameClient.value = c.nomeCliente;
        cpfClient.value = c.cpfCliente;
        emailClient.value = c.emailCliente;
        telefoneClient.value = c.foneCliente;    
        cepClient.value = c.cepCliente;
        logradouroClient.value = c.logradouroCliente;
        numeroClient.value = c.numeroCliente;
        complementClient.value = c.complementoCliente;
        bairroClient.value = c.bairroCliente;
        cidadeClient.value = c.cidadeCliente;
        ufClient.value = c.ufCliente;
      });
    });
  }

  // Função para definir cliente não cadastrado
  api.setClient(() => {
    let campoBusca = document.getElementById('searchClient').value;
    nameClient.focus();
    foco.value = "";
    nameClient.value = campoBusca;
  });

  // Reset form
  api.resetF((args) => {
    resetF();
  });
});
