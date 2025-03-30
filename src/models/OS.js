// src/models/OS.js
const { model, Schema } = require('mongoose');

const osSchema = new Schema({
    numeroOS: { type: String, required: true }, // Número da OS
    dataOS: { type: Date, default: Date.now }, // Data de criação da OS
    nomeClienteOS: { type: String, required: true }, // Nome do cliente
    cpfClienteOS: { type: String, unique: true, index: true, required: true }, // CPF do cliente
    telefoneClienteOS: { type: String, required: true }, // Telefone do cliente
    status: { type: String, enum: ['Aberta', 'Em andamento', 'Concluída', 'Cancelada'], default: 'Aberta' }, // Status da OS
    funcionarioResponsavelOS: { type: String, required: true }, // Nome do funcionário responsável
    modeloVeiculoOS: { type: String, required: true }, // Modelo do veículo
    placaVeiculoOS: { type: String, required: true }, // Placa do veículo
    anoVeiculoOS: { type: Number, required: true }, // Ano do veículo
    corVeiculoOS: { type: String }, // Cor do veículo
    tipoServicoOS: { type: String, required: true }, // Tipo de serviço realizado
    descricaoProblemaOS: { type: String }, // Descrição do problema
    observacaoClienteOS: { type: String }, // Observações do cliente
    conclusaoTecnicoOS: { type: String }, // Conclusão do técnico
    pecasTrocaOS: { type: String }, // Peças trocadas
    acessoriosOS: { type: String }, // Acessórios envolvidos
    totalOS: { type: Number, required: true }, // Valor total da OS
    formasPagamentoOS: { 
        type: [String], // Lista de formas de pagamento
        enum: ['Dinheiro', 'Cartão de Crédito', 'Cartão de Débito', 'PIX', 'Transferência'],
    }
}, { versionKey: false });

module.exports = model('OS', osSchema);
