const { model, Schema } = require('mongoose');
const { type } = require('os')

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
    tipoServicoOS: { type: String, required: true }, // Tipo de serviço realizado (ex: troca de óleo, revisão, etc.)
    descricaoProblemaOS: { type: String }, // Descrição do problema relatado pelo cliente
    observacaoClienteOS: { type: String }, // Observações fornecidas pelo cliente
    conclusaoTecnicoOS: { type: String }, // Conclusão do técnico sobre o serviço realizado
    pecasTrocaOS: { type: String }, // Peças que foram trocadas
    acessoriosOS: { type: String }, // Acessórios envolvidos no serviço
    totalOS: { type: Number, required: true }, // Valor total da OS
    formasPagamentoOS: { 
        type: [String], // Lista de formas de pagamento utilizadas
        enum: ['Dinheiro', 'Cartão de Crédito', 'Cartão de Débito', 'PIX', 'Transferência'], 
    }
}, { versionKey: false });

module.exports = model('OS', osSchema);
