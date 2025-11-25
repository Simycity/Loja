const ProdutosModel = require("../models/produtosModel");

const ProdutosController = {
  async list(req, res) {
    try {
      const items = await ProdutosModel.listAll();
      res.json(items);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erro ao listar produtos" });
    }
  },

  async get(req, res) {
    try {
      const item = await ProdutosModel.findById(req.params.id);
      if (!item)
        return res.status(404).json({ error: "Produto não encontrado" });
      res.json(item);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erro ao buscar produto" });
    }
  },

  async create(req, res) {
    try {
      const prod = req.body;
      const novo = await ProdutosModel.create(prod);
      res.status(201).json(novo);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erro ao criar produto" });
    }
  },

  async update(req, res) {
    try {
      const id = req.params.id;
      const prod = req.body;
      const atualizado = await ProdutosModel.update(id, prod);
      res.json(atualizado);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erro ao atualizar produto" });
    }
  },

  async remove(req, res) {
    try {
      await ProdutosModel.remove(req.params.id);
      res.json({ success: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erro ao deletar produto" });
    }
  },
};

module.exports = ProdutosController;
