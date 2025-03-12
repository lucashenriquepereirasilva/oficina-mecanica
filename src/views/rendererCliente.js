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
