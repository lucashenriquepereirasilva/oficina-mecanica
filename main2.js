// Banco de dados

const {conectar, desconectar} = require('./database.js')
const clienteModel = require('./src/models/OS.js')

const osSalvar = async (cpfCli,nomeCli,status,responsável,carros,phone,placa,ano,cor,ploblema,tecnico,pecas,ace,tot,pag)=> {
    try{
        const novoCliente = new clienteModel({
          cpfCliente: cpfCli,
          nomeCliente: nomeCli,
          status: status,
          funcionarioResponsavelOS: responsável,
        modeloVeiculoOS: carros,
          telefoneClientOS: phone,
          placaVeiculoOS: placa,
          anoVeiculoOS: ano,
          corVeiculoOS: cor,
          descricaoProblemaOS: ploblema,
          conclusaoTecnicoOS: tecnico,
          pecasTrocaOS: pecas,
          acessoriosOS:  ace ,
          totalOS: tot,
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
        const Clientes = await osModel.find()
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

const atualizarCliente = async (id,cpfCli,nomeCli,status,responsável,carros,phone,placa,ano,cor,ploblema,tecnico,pecas,ace,tot,pag)=>{
    try {
        const clienteEditado = await osModel.findByIdAndUpdate(id,{nomeCliente: nomeCli,cpfCliente: cpfCli,status: status, funcionarioResponsavel: responsável, modeloVeiculoOS: carros, telefoneClientOS:phone,placaVeiculoOS: placa,anoVeiculoOS: ano, corVeiculoOS: cor,descricaoProblemaOS: ploblema,conclusaoTecnicoOS: tecnico,pecasTrocaOS: pecas,acessoriosOS:ace, total: tot,formasPagamentoOS:pag })
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
  //await osSalvar("12345678","luca","Aberta","Toninho","caloi","11091","Preta","Preventiva","10/04/05","Trocar a corrente","Trocar a corrente por uma nova modelo 05","Corrente", "Bolsa pequena e uma lanterna dianteira",1250,"Dinheiro")
   // await buscarClienteNome("gabriel")
  //await buscarClienteCPF("44909123")
  //await atualizarCliente("67e43e01d73e7a27dd3af8e0","123456789000","gabriel","Aberta","pituca","caloi","11091","vermelha","Corretiva","10/04/06","Trocar a corrente","Trocar a corrente por uma nova modelo 05","Corrente", "Bolsa pequena e uma lanterna dianteira",1250,"Dinheiro")
  //await excluirCliente("67db2386b6501ad6704953b7")
  await desconectar()
}

Iniciarsistema()