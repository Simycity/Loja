const pool = require("../config/db");

const ProdutosModel = {
  async listAll() {
    const [rows] = await pool.query("SELECT * FROM produtos");
    return rows;
  },

  async findById(id) {
    const [rows] = await pool.query("SELECT * FROM produtos WHERE id = ?", [
      id,
    ]);
    return rows[0];
  },

  async create(prod) {
    const sql = `INSERT INTO produtos
      (nome, sku, descricao, categoria, marca, medida, tamanho, precoCusto, precoVenda, quantidade, fornecedor, imagemUrl)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const params = [
      prod.nome,
      prod.sku,
      prod.descricao || null,
      prod.categoria || null,
      prod.marca || null,
      prod.medida || null,
      prod.tamanho || null,
      prod.precoCusto || 0,
      prod.precoVenda || 0,
      prod.quantidade || 0,
      prod.fornecedor || null,
      prod.imagemUrl || null,
    ];
    const [result] = await pool.query(sql, params);
    return { id: result.insertId, ...prod };
  },

  async update(id, prod) {
    const sql = `UPDATE produtos SET nome=?, sku=?, descricao=?, categoria=?, marca=?, medida=?, tamanho=?, precoCusto=?, precoVenda=?, quantidade=?, fornecedor=?, imagemUrl=? WHERE id=?`;
    const params = [
      prod.nome,
      prod.sku,
      prod.descricao || null,
      prod.categoria || null,
      prod.marca || null,
      prod.medida || null,
      prod.tamanho || null,
      prod.precoCusto || 0,
      prod.precoVenda || 0,
      prod.quantidade || 0,
      prod.fornecedor || null,
      prod.imagemUrl || null,
      id,
    ];
    await pool.query(sql, params);
    return { id, ...prod };
  },

  async remove(id) {
    await pool.query("DELETE FROM produtos WHERE id = ?", [id]);
    return true;
  },
};

module.exports = ProdutosModel;
