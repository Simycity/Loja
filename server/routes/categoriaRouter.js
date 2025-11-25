const express = require("express");
const router = express.Router();
const CategoriaController = require("../controllers/categoriaController");

// LISTAR TODAS
router.get("/", CategoriaController.listar);

// BUSCAR POR ID
router.get("/:id", CategoriaController.buscarPorId);

module.exports = router;
