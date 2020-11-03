const express = require('express')
const router = express.Router();
const repuestoController = require('../controllers/repuestos.controller')

router.get("/", repuestoController.get);
router.post("/add", repuestoController.post);

module.exports = router;