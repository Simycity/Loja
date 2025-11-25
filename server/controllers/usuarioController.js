const Usuario = require("../models/usuarioModel");

module.exports = {
  // LISTAR TODOS OS USUÁRIOS
  listar: async (req, res) => {
    try {
      const dados = await Usuario.listar();
      return res.status(200).json(dados);
    } catch (err) {
      return res.status(500).json({ erro: err.message });
    }
  },

  // BUSCAR POR ID
  buscarPorId: async (req, res) => {
    try {
      const id = req.params.id;
      const usuario = await Usuario.buscarPorId(id);

      if (!usuario) {
        return res.status(404).json({ mensagem: "Usuário não encontrado." });
      }

      return res.status(200).json(usuario);
    } catch (err) {
      return res.status(500).json({ erro: err.message });
    }
  },

  // CRIAR NOVO USUÁRIO
  criar: async (req, res) => {
    try {
      const novoUsuario = await Usuario.criar(req.body);
      return res.status(201).json(novoUsuario);
    } catch (err) {
      return res.status(500).json({ erro: err.message });
    }
  },

  // ATUALIZAR USUÁRIO
  atualizar: async (req, res) => {
    try {
      const id = req.params.id;
      const atualizado = await Usuario.atualizar(id, req.body);

      if (!atualizado) {
        return res.status(404).json({ mensagem: "Usuário não encontrado." });
      }

      return res
        .status(200)
        .json({ mensagem: "Usuário atualizado com sucesso." });
    } catch (err) {
      return res.status(500).json({ erro: err.message });
    }
  },

  // EXCLUIR USUÁRIO
  excluir: async (req, res) => {
    try {
      const id = req.params.id;
      const excluido = await Usuario.excluir(id);

      if (!excluido) {
        return res.status(404).json({ mensagem: "Usuário não encontrado." });
      }

      return res
        .status(200)
        .json({ mensagem: "Usuário excluído com sucesso." });
    } catch (err) {
      return res.status(500).json({ erro: err.message });
    }
  },

  // LOGIN (EMAIL + SENHA)
  login: async (req, res) => {
    try {
      const { email, senha } = req.body;
      const usuario = await Usuario.login(email, senha);

      if (!usuario) {
        return res.status(401).json({ mensagem: "Credenciais inválidas." });
      }

      return res.status(200).json({
        mensagem: "Login realizado com sucesso.",
        usuario: {
          id: usuario.id,
          nome: usuario.nome,
          email: usuario.email,
          tipo: usuario.tipo,
        },
      });
    } catch (err) {
      return res.status(500).json({ erro: err.message });
    }
  },
};
