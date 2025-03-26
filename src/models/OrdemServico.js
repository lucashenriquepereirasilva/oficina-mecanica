/**
 * Modelo de daados para  construção das coleções ("tabelas")
 * Clientes
 */




// importação dos recursos framework mongoose

const {model,  Schema} = require('mongoose')


// Criação da estrutura da coleção Clientes
const OrdemServicoSchema = new Schema({
    descriçãoservico: {
        type: String
    },

    datainicio: {
        type: String
    },

    dataconclusão: {
        type: String,
        unique: true,
        index: true
    },

    status: {
        type: Date,
        default: Date.now,
    },
    formaPagamento: {
        type: Date,
        default: Date.now
    },
}, {versionKey: false}) // não versionar ps dados armazenados

// exportar para o main o modelo de dados
// Obs : clientes será o nome da coleção
module.exports = model('OrdemServico', OrdemServicoSchema)
