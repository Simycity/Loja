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
// const pedidosRouter = require("./routes/pedidosRouter");
const produtosRouter = require("./routes/produtosRouter");

// Rotas
app.use("/usuarios", usuariosRouter);
app.use("/clientes", clientesRouter);
app.use("/categoria", categoriaRouter);
// app.use("/pedidos", pedidosRouter);
app.use("/produtos", produtosRouter);

// Rota padrão do servidor
app.get("/", (req, res) => {
  res.json("Oi, bem vindo");
});

// Traz as configurações do banco
const pool = require("./config/db.js");

// Cria uma conexão teste com o banco
pool.getConnection((erro, conexao) => {
  // Se deu erro, avisa e encerra a tentativa
  if (erro) {
    console.log("Erro ao tentar conectar com o banco de dados");
    process.exit(1);
  }

  //   Se deu certo, também avisa e para a conexão
  console.log("Conectado com o banco de dados com sucesso!");
  conexao.release();
  //   Se o banco de dados estiver ativo, ai sim o servidor será iniciado
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);

  });
});
