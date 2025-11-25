const express = require("express");
const router = express.Router();
const ProdutosController = require("../controllers/produtosController");

router.get("/", ProdutosController.list);
router.get("/:id", ProdutosController.get);
router.post("/", ProdutosController.create);
router.put("/:id", ProdutosController.update);
router.delete("/:id", ProdutosController.remove);

module.exports = router;
