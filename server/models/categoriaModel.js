const pool = require("../config/db");

module.exports = {
    // LISTAR TODAS AS CATEGORIAS
    listar: async () => {
        const [rows] = await pool.query("SELECT * FROM categorias ORDER BY nome ASC");
        return rows;
    },

    // BUSCAR CATEGORIA POR ID
    buscarPorId: async (id) => {
        const [rows] = await pool.query("SELECT * FROM categorias WHERE id = ?", [id]);
        return rows[0] || null;
    }
};
