const express = require("express");
const router = express.Router();

// Importação do controller
const pedidosController = require("../controllers/pedidosController");

// Criando rotas

router.get("/", pedidosController.listar); //Pegar todos os pedidos

router.get("/:id", pedidosController.listarUmPedido); //Pegar pedido por ID

// Criar um pedido
router.post("/", pedidosController.criarPedido); //Criar um novo pedido

// Atualizar um pedido
router.put("/:id", pedidosController.atualizarPedido); //Atualizar um pedido existente

// Exporta o router para ser utilizado em outros arquivos
module.exports = router;
