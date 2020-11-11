const express = require('express')
const router = express.Router();
const repuestoController = require('../controllers/repuestos.controller')

router.get("/", repuestoController.get);
router.post("/add", repuestoController.post);
router.post("/addd", repuestoController.post2);
module.exports = router;