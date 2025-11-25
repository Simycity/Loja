const ClientesModel = require("../models/clientesModel");

const ClientesController = {
  async list(req, res) {
    try {
      const items = await ClientesModel.listAll();
      res.json(items);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erro ao listar clientes" });
    }
  },

  async get(req, res) {
    try {
      const item = await ClientesModel.findById(req.params.id);
      if (!item)
        return res.status(404).json({ error: "Cliente não encontrado" });
      res.json(item);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erro ao buscar cliente" });
    }
  },

  async create(req, res) {
    try {
      const cli = req.body;
      const novo = await ClientesModel.create(cli);
      res.status(201).json(novo);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erro ao criar cliente" });
    }
  },

  async update(req, res) {
    try {
      const id = req.params.id;
      const cli = req.body;
      const atualizado = await ClientesModel.update(id, cli);
      res.json(atualizado);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erro ao atualizar cliente" });
    }
  },

  async remove(req, res) {
    try {
      await ClientesModel.remove(req.params.id);
      res.json({ success: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erro ao deletar cliente" });
    }
  },
};

module.exports = ClientesController;
