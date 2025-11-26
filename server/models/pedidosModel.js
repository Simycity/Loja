// Importa a conexão com o banco de dados
const pool = require("../config/db.js");

// Criando o objeto com as funções do model
const pedidosModel = {
  // Função que solicita ao banco a lista de pedidos
  async listarPedidos() {
    // cria comando sql para listar pedidos
    const sql = "SELECT * FROM pedidos";
    /*
            Faz a consulta sql, 
            e guarda o resultado na variável [linhas]
        */
    const [linhas] = await pool.query(sql);
    // Retorna as linhas (lista de pedidos) para quem chamou a função
    return linhas;
  },
};

// Exporta esse objeto pra ser utilizado em outros arquivos
module.exports = pedidosModel;
