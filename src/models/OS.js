/**
 * Modelo de dados para construção das coleções("tabelas")
 * clientes 
 */

//Importação dos recursos do framework mongoose
const {model, Schema} = require('mongoose')
const { version, type } = require('os')

const mongoose = require('mongoose');
const { Schema } = mongoose;

const OrdemServicoSchema = new Schema({
    clienteNome: {
        type: String,
        required: true
    },
    custoTotal: {
        type: Number,
        required: true
    },
    dataEntrega: {
        type: Date
    },
    equipeResponsavel: {
        type: String
    },
    descricaoProblema: {
        type: String,
        required: true
    },
    diagnosticoTecnico: {
        type: String
    },
    listaPecas: {
        type: [String]  // Lista de peças utilizadas no reparo
    },
    statusOrdem: {
        type: String,
        enum: ['Aberto', 'Em andamento', 'Concluído', 'Cancelado'],
        default: 'Aberto'
    }
}, { versionKey: false, timestamps: true }); // Adiciona campos createdAt e updatedAt automaticamente

module.exports = mongoose.model('OrdemServico', OrdemServicoSchema);

//Exportar para o main o modelo de dados
//Clientes será o nome da coleção

module.exports = model('OS', cadastroOS)