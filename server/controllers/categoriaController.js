const Categoria = require("../models/categoriaModel");

module.exports = {

    // LISTAR TODAS AS CATEGORIAS
    listar: async (req, res) => {
        try {
            const dados = await Categoria.listar();
            return res.status(200).json(dados);
        } catch (err) {
            return res.status(500).json({ erro: err.message });
        }
    },

    // BUSCAR POR ID
    buscarPorId: async (req, res) => {
        try {
            const id = req.params.id;
            const categoria = await Categoria.buscarPorId(id);

            if (!categoria) {
                return res.status(404).json({ mensagem: "Categoria não encontrada." });
            }

            return res.status(200).json(categoria);
        } catch (err) {
            return res.status(500).json({ erro: err.message });
        }
    }
};
