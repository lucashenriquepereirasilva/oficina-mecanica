/**
 * Módulos de conexão com o banco de dados
 * Uso de Framework mongoose
 */

// Importação do Mongoose
const mongoose = require('mongoose')

// configuração do acesso ao banco de dados
// ip/link - authenticação
// obs: Atlas(Obter via Atlas)
// para criar um banco de dados personalizado basta escolher um nome final da string url

const url = 'mongodb+srv://admin:123Senac@projetonode.uv81h.mongodb.net/db'

 // Criar uma variavel de apoio para validação

 let conectado = false

 // metodo  para conectar o banco de dados
 // async executar a função de forma assincrona

 const conectar = async () => {
    // Validação ( se n tiver conectado , conectar)
    if (!conectado) {
        // conectar com o banco
        // try catch - Tratamento de exeções
        try{
            await mongoose.connect(url) // conectar
            conectado = true // setar a varaivel
            console.log("MongoDB conectado com Sucesso")
            return true // para o main identificar a conexao estabelecida
        } catch (error) {
           console.log(error)
             
        }
    }

 }

 


  // metodo  para desconectar o banco de dados
 const desconectar = async () => {
    // Validação ( se  estiver conectado , desconectar)
    if (conectado) {
        // desconectar do  banco de dados
        // try catch - Tratamento de exeções
        try{
            await mongoose.disconnect(url) // desconectar
            conectado = false // setar a varaivel
            console.log("MongoDB desconectado com Sucesso")
            return true //  para o main identificar que o banco de dados foi desconectado com sucesso
        } catch (error) {
            console.log(error)
        }
    }

 }

 // Exportar para o main os metodos conectar e desconectar
 module.exports =  { conectar, desconectar }