// ordemServico.js

const { conectar, desconectar } = require('./database.js');
const OrdemServico = require('./src/models/OrdemServico.js');

// Função para cadastrar uma nova ordem de serviço
const salvarOrdemServico = async (clienteId, descricao) => {
  try {
    const novaOrdemServico = new OrdemServico({

        nomeCliente: clienteId
    });

    await novaOrdemServico.save();
    console.log('Ordem de Serviço criada com sucesso');
  } catch (error) {
    console.log('Erro ao criar ordem de serviço:', error);
  }
};

// Função para listar todas as ordens de serviço
const listarOrdensServico = async () => {
  try {
    const ordens = await OrdemServico.find().populate('clienteId').sort({ dataCriacao: -1 });
    console.log(ordens);
  } catch (error) {
    console.log('Erro ao listar ordens de serviço:', error);
  }
};

// Função para buscar ordem de serviço por ID
const buscarOrdemServicoPorId = async (id) => {
  try {
    const ordemServico = await OrdemServico.findById(id).populate('clienteId');
    console.log(ordemServico);
  } catch (error) {
    console.log('Erro ao buscar ordem de serviço:', error);
  }
};

// Função para atualizar os dados de uma ordem de serviço
const atualizarOrdemServico = async (id, descricao, status, dataConclusao) => {
  try {
    const ordemServicoAtualizada = await OrdemServico.findByIdAndUpdate(
      id,
      {
        descricao,
        status,
        dataConclusao
      },
      { new: true, runValidators: true }
    );
    console.log('Ordem de Serviço atualizada com sucesso');
  } catch (error) {
    console.log('Erro ao atualizar ordem de serviço:', error);
  }
};

// Função para excluir uma ordem de serviço
const excluirOrdemServico = async (id) => {
  try {
    await OrdemServico.findByIdAndDelete(id);
    console.log('Ordem de Serviço excluída com sucesso');
  } catch (error) {
    console.log('Erro ao excluir ordem de serviço:', error);
  }
};

// Função para iniciar o sistema e realizar operações
const iniciarSistema = async () => {
  console.clear();
  console.log('Sistema de Ordem de Serviço');
  console.log('--------------------------');

  await conectar();

  // Criando novas ordens de serviço (exemplo)
   await salvarOrdemServico('60c72b2f9b0b3c46e8d0bdfa', 'Reparar motor');
 // await salvarOrdemServico('60c64b2f9b0b3876e8d0bdfa', 'Trocar óleo');

   //Listar todas as ordens de serviço
  // await listarOrdensServico();

  // Buscar ordem de serviço pelo ID
  // await buscarOrdemServicoPorId('60c72b2f9b0b3c46e8d0bdfa');

  // Atualizar dados de uma ordem de serviço
   //await atualizarOrdemServico('60c72b2f9b0b3c46e8d0bdfa', 'Troca de pneus', 'em andamento', );

  // Excluir uma ordem de serviço
  //await excluirOrdemServico('60c72b2f9b0b3c46e8d0bdfa', 'troca de oleo');

  await desconectar();

const form = document.getElementById('serviceOrderForm');
const btnCreateOS = document.getElementById('btnCreateOS');
const btnUpdateOS = document.getElementById('btnUpdateOS');
const btnDeleteOS = document.getElementById('btnDeleteOS');

// Criar Ordem de Serviço
btnCreateOS.addEventListener('click', (event) => {
    event.preventDefault();
    const serviceOrder = {
      
    };

    // Enviar para o backend via IPC
    window.api.send('new-service-order', serviceOrder);
});

};
await conectar();

iniciarSistema();


