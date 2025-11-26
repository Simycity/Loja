require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT;

const cors = require("cors");
// Middleware para resolver o cors
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

// Middelware para lidar com os jsons
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Criação das rotas padrões
const usuariosRouter = require("./routes/usuarioRouter");
const clientesRouter = require("./routes/clientesRouter");
const categoriaRouter = require("./routes/categoriaRouter");
const produtosRouter = require("./routes/produtosRouter");
const pedidosRouter = require("./routes/pedidosRouter");

// Rotas principais do servidor
app.use("/usuarios", usuariosRouter);
app.use("/clientes", clientesRouter);
app.use("/categoria", categoriaRouter);
app.use("/produtos", produtosRouter);
app.use("/pedidos", pedidosRouter);

// Rota padrão do servidor
app.get("/", (req, res) => {
  res.json("Oi, bem vindo");
});

// Traz as configurações do banco
const pool = require("./config/db.js");

// Cria uma conexão teste com o banco
(async () => {
  // Se o banco de dados estiver ativo, o servidor será iniciado
  try {
    await pool.getConnection();
    console.log("Banco Conectado");
    // Se o banco de dados estiver ativoa, ai sim o servidor será iniciado
    app.listen(port, () => {
      console.log(`Servidor funcionando na porta ${port}`);
    });
  } catch (erro) {
    // Se deu erro, avisa e encerra a tentativa
    console.log("Erro ao conectar com o banco de dados:");
    process.exit(1);
  }
})();
