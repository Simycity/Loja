const pool = require("../config/db");

const ClientesModel = {
  async listAll() {
    const [rows] = await pool.query("SELECT * FROM clientes");
    return rows;
  },

  async findById(id) {
    const [rows] = await pool.query("SELECT * FROM clientes WHERE id = ?", [
      id,
    ]);
    return rows[0];
  },

  async create(cliente) {
    const sql = `INSERT INTO clientes
      (id, nome, email, documento, tipo, telefone, dataNascimento, cep, logradouro, complemento, bairro, cidade, uf, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const params = [
      cliente.id,
      cliente.nome,
      cliente.email || null,
      cliente.documento || null,
      cliente.tipo || null,
      cliente.telefone || null,
      cliente.dataNascimento || null,
      cliente.endereco.cep || null,
      cliente.endereco.logradouro || null,
      cliente.endereco.complemento || null,
      cliente.endereco.bairro || null,
      cliente.endereco.cidade || null,
      cliente.endereco.uf || null,
      cliente.status || "Ativo",
    ];
    await pool.query(sql, params);
    return cliente;
  },

  async update(id, cliente) {
    const sql = `UPDATE clientes SET nome=?, email=?, documento=?, tipo=?, telefone=?, dataNascimento=?, cep=?, logradouro=?, complemento=?, bairro=?, cidade=?, uf=?, status=? WHERE id=?`;
    const params = [
      cliente.nome,
      cliente.email || null,
      cliente.documento || null,
      cliente.tipo || null,
      cliente.telefone || null,
      cliente.dataNascimento || null,
      cliente.cep || null,
      cliente.logradouro || null,
      cliente.complemento || null,
      cliente.bairro || null,
      cliente.cidade || null,
      cliente.uf || null,
      cliente.status || "Ativo",
      id,
    ];
    await pool.query(sql, params);
    return { id, ...cliente };
  },

  async remove(id) {
    await pool.query("DELETE FROM clientes WHERE id = ?", [id]);
    return true;
  },
};

module.exports = ClientesModel;
