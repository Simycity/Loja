const pool = require("../config/db");

module.exports = {
  // LISTAR TODOS
  listar: async () => {
    const sql = "SELECT * FROM usuarios ORDER BY nome ASC";
    const [rows] = await pool.query(sql);
    return rows;
  },

  // BUSCAR POR ID
  buscarPorId: async (id) => {
    const sql = "SELECT * FROM usuarios WHERE id = ?";
    const [rows] = await pool.query(sql, [id]);
    return rows[0];
  },

  // CRIAR
  criar: async (usuario) => {
    const sql = `
            INSERT INTO usuarios (nome, email, senha, tipo, imagemUrl)
            VALUES (?, ?, ?, ?, ?)
        `;
    const [result] = await pool.query(sql, [
      usuario.nome,
      usuario.email,
      usuario.senha,
      usuario.tipo,
      usuario.imagemUrl,
    ]);
    return { id: result.insertId, ...usuario };
  },

  // ATUALIZAR
  atualizar: async (id, usuario) => {
    const sql = `
            UPDATE usuarios
            SET nome = ?, email = ?, senha = ?, tipo = ?, imagemUrl = ?
            WHERE id = ?
        `;
    const [result] = await pool.query(sql, [
      usuario.nome,
      usuario.email,
      usuario.senha,
      usuario.tipo,
      usuario.imagemUrl,
      id,
    ]);
    return result.affectedRows > 0;
  },

  // EXCLUIR
  excluir: async (id) => {
    const sql = "DELETE FROM usuarios WHERE id = ?";
    const [result] = await pool.query(sql, [id]);
    return result.affectedRows > 0;
  },

  // LOGIN — BUSCAR POR EMAIL E SENHA
  login: async (email, senha) => {
    const sql = "SELECT * FROM usuarios WHERE email = ? AND senha = ?";
    const [rows] = await pool.query(sql, [email, senha]);
    return rows[0] || null;
  },
};
