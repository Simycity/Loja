// Importação do model de pedidos
const pedidosModel = require("../models/pedidosModel.js");

// Criando o objeto de com as funções do controller
const pedidosController = {
  // Função para solicitar ao model os pedidos
  async listar(req, res) {
    try {
      /*
            Guarda na variável pedidos, o retorno da função listar vinda do model, 
            que por sua vez, guardou em uma lista os pedidos, e retornou
        */
      const pedidos = await pedidosModel.listarPedidos();
      /*
        Responde o usuário a lista de pedidos, convertendo em json 
      */
      res.status(200).json(pedidos);
    } catch (erro) {
      console.error("Erro ao listar pedidos:", erro);
      res.status(500).json({ error: "Erro ao listar pedidos" });
    }
  },
};

// Exportando o objeto para ser utilizado em outros arquivos
module.exports = pedidosController;
