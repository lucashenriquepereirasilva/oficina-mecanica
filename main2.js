// Banco de dados

const {conectar, desconectar} = require('./database.js')
const clienteModel = require('./src/models/OS.js')

const osSalvar = async (cpfCli,nomeCli,tele,funC,stat,respo,veiculo,placa,Ano,cor,tip,ploblemas,observacão,tot,pecas,ace,soma,pag)=> {
    try{
        const novoCliente = new clienteModel({
          cpfClienteOS: cpfCli,
          nomeClienteOS: nomeCli,
          telefoneClienteOS: tele,
          funcionarioResponsavelOS: funC,
          status: stat,
          funcionarioResponsavelOS: responsavel,
          modeloVeiculoOS: veiculo,
          placaVeiculoOS: placa,
          anoVeiculoOS: Ano,
          corVeiculoOS: cor,
          tipoServicoOS: tip,
          descricaoProblemaOS: ploblemas,
          observacaoClienteOS: observacão,
          conclusaoTecnicoOS: tot,
         pecasTrocaOS: pecas,
         acessoriosOS: ace,
         totalOS: soma,
         formasPagamentoOS: pag

        })
        await novoCliente.save()
        console.log("Os Salva")
    }catch (error){
        if(error.code = 11000){
            console.log(`Erro: O CPF: ${cpfCli}ja está cadastrado`)
        }
        else{
            console.log(error)
        }
    }
}
const listarCliente = async ()=>{
    try{
        const Clientes = await clienteModel.find()
        console.log(Clientes)
    }catch(error){
        console.log(error)
    }
}
const buscarClienteNome = async(nome)=>{
    try {
        const clienteNome = await clienteModel.find({nomeCliente: new RegExp(nome ,'i')})
        console.log(clienteNome)
    } catch (error) {
        console.log(error)
    }
}
const buscarClienteCPF = async(cpf)=>{
    try {
        const clienteCPF = await clienteModel.find({cpfCliente: new RegExp(cpf)})
        console.log(clienteCPF)
    } catch (error) {
        console.log(error)
    }
}

const atualizarCliente = async (id,cpfCli,nomeCli,tele,funC,stat,respo,veiculo,placa,Ano,cor,tip,ploblemas,observacão,tot,pecas,ace,soma,pag)=>{
    try {
        const clienteEditado = await clienteModel.findByIdAndUpdate(id,{nomeClienteOS: nomeCli,cpfClienteOS: 
        cpfCli,telefoneClienteOS: tele, funcionarioResponsavelOS: funC, status: stat, funcionarioResponsavelOS:responsavel,modeloVeiculoOS: veiculo,placaVeiculoOS: placa, anoVeiculoOS: Ano,corVeiculoOS: cor,tipoServicoOS: tip,descricaoProblemaOS: ploblemas,observacaoClienteOS:observacão, conclusaoTecnicoOS: tot,pecasTrocaOS: pecas, acessoriosOS:ace, totalOS:soma, formasPagamentoOS: pag })
        console.log("OS Atualizada")
    } catch (error) {
        if(error.code = 11000){
            console.log(`Erro: O CPF: ${cpfCli}ja está cadastrado`)
        }
        else{
            console.log(error)
        }
    }
}

const excluirCliente = async (id)=>{
    try {
        const clienteDeletado = await clienteModel.findOneAndDelete(id)
        console.log("Os deletada")
    } catch (error) {
        console.log(error)
    }
}


const Iniciarsistema = async ()=> {
  console.clear()
  console.log("Estudo do MongoDB")
  console.log("------------------")
  await conectar()
  //await listarCliente()
  //await osSalvar("roma","Aberta","Toninho","caloi","11091","Preta","Preventiva","10/04/05","Trocar a corrente","Trocar a corrente por uma nova modelo 05","Corrente", "Bolsa pequena e uma lanterna dianteira",1250,"Dinheiro")
   // await buscarClienteNome("gabriel")
  //await buscarClienteCPF("44909123")

  //await excluirCliente("67db2386b6501ad6704953b7")
  await desconectar()
}

Iniciarsistema()