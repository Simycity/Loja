const express = require("express");
const router = express.Router();
const PedidosController = require("../controllers/pedidosController");

router.get("/", PedidosController.list);
router.get("/:id", PedidosController.get);
router.post("/", PedidosController.create);
router.delete("/:id", PedidosController.remove);

module.exports = router;
