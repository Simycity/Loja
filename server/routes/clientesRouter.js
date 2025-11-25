const express = require("express");
const router = express.Router();
const ClientesController = require("../controllers/clientesController");

router.get("/", ClientesController.list);
router.get("/:id", ClientesController.get);
router.post("/", ClientesController.create);
router.put("/:id", ClientesController.update);
router.delete("/:id", ClientesController.remove);

module.exports = router;
